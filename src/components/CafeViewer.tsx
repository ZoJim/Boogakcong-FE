import React, {useState} from 'react';
import {Box, Button, Card, CardMedia, TextField, Typography} from '@mui/material';
import KakaoMap from '@/components/KakaoMap';
import {blue, grey} from "@mui/material/colors";
import { postReview } from '@/app/api/review'; // 리뷰 등록 API
import {accessTokenAtom} from "@/state/authAtom";
import {useAtomValue} from "jotai";

interface CafeViewerProps {
    id: number;
    name: string;
    phoneNumber: string;
    roadAddress: string;
    addressDetail: string;
    latitude: number;
    longitude: number;
    placeUrl: string;
    outletCount: number;
    maxPeoplePerTable: number;
    notice: string;
    isWifi: boolean;
    reviewResponse: {
        id: number;
        cafeId: number;
        content: string;
        createdAt: string;
    }[];
    isLoggedIn: boolean;
}

const CafeViewer = (
    {
        id: id,
        name,
        phoneNumber,
        roadAddress,
        addressDetail,
        latitude,
        longitude,
        placeUrl,
        outletCount,
        maxPeoplePerTable,
        notice,
        reviewResponse,
        isWifi,
    }: CafeViewerProps
) => {
    const [newComment, setNewComment] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null); // Success or error message
    const accessToken = useAtomValue(accessTokenAtom); // Jotai로 accessToken 가져오기
    const isLoggedIn = Boolean(accessToken); // 로그인 여부 결정

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            setFeedbackMessage('리뷰 내용을 입력해주세요.');
            return;
        }

        try {
            await postReview(accessToken as string, id, newComment.trim());
            setNewComment(''); // Clear the input field
            setFeedbackMessage('리뷰가 성공적으로 등록되었습니다.');
        } catch (error) {
            console.error('리뷰 등록 실패:', error);
            setFeedbackMessage('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
        }

        // 메시지는 몇 초 후 사라지게 설정
        setTimeout(() => setFeedbackMessage(null), 3000);
    };


    return (
        <Card
            sx={{
                borderRadius: 5,
                width: 350,
                padding: 2,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: 2,
                    marginTop: 4,
                }}
            >
                {name}
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    height: 200,
                    marginBottom: 2,
                }}
            >
                <KakaoMap
                    initialLon={longitude}
                    initialLat={latitude}
                    latitude={latitude}
                    longitude={longitude}
                    level={3}
                    mapId="cafeMap"
                />
            </Box>

            <Button
                variant="contained"
                color="primary"
                sx={{
                    borderRadius: '16px',
                    paddingX: 4,
                    paddingY: 1,
                    color: '#FFFFFF',
                    backgroundColor: blue[200],
                    '&:hover': {
                        backgroundColor: blue[300],
                    },
                }}
                onClick={() => {
                    window.open(placeUrl, '_blank');
                }}
            >
                카카오 맵으로 보기
            </Button>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 2,
                }}
            >
                <CardMedia
                    component="img"
                    image="/images/sanjinee.png"
                    sx={{
                        width: 40,
                        height: 40,
                        marginRight: 1,
                        alignItems: 'left'
                    }}
                />
                <Typography
                    variant="body2"
                    sx={{
                        color: 'gray',
                        textAlign: 'left',
                    }}
                >
                    {notice ? notice : '아직 사장님이 등록하지 않은 카페입니다.'}
                </Typography>
            </Box>
            <Box>
                {notice ? (
                    <>
                        - 콘센트가 {outletCount}개 있어요.<br/>
                        - 최대 {maxPeoplePerTable}명까지 앉을 수 있어요.<br/>
                        {isWifi && '- 와이파이가 있어요.'}
                    </>
                ) : (
                    ''
                )}
            </Box>
            { /* 스크롤 영역 */}

            <Box
                sx={{
                    width: '100%',
                    mt: 3,
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        marginBottom: 1,
                    }}
                >
                    간단 리뷰
                </Typography>
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        maxHeight: '110px',
                        width: '100%',
                    }}
                >
                {reviewResponse && reviewResponse.length > 0 && (
                    <Box
                        sx={{
                            width: '100%',
                            textAlign: 'left',
                        }}
                    >
                        {reviewResponse.map((review) => (
                            <Box
                                key={review.id}
                                sx={{
                                    marginBottom: 2,
                                    padding: 2,
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: 2,
                                    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                                    {review.content}
                                </Typography>
                                <Typography variant="caption" sx={{color: 'gray'}}>
                                    {new Date(review.createdAt).toLocaleString()}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
                </Box>
            </Box>
            <Box sx={{width: '100%', marginTop: 3}}>
                {isLoggedIn ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="간단 리뷰를 남겨주세요!"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            multiline
                            disabled={!isLoggedIn}
                            rows={1}
                        />
                        <Button
                            variant="contained"
                            onClick={handleCommentSubmit}
                            sx={{
                                backgroundColor: blue[200],
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: blue[300],
                                },
                            }}
                        >
                            리뷰 등록
                        </Button>
                    </Box>
                ) : (
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'center',
                            color: grey[500],
                            mb: 2,
                        }}
                    >
                        로그인을 해야 리뷰를 작성할 수 있어요 :)
                    </Typography>
                )}
            </Box>
        </Card>
    );
};

export default CafeViewer;
