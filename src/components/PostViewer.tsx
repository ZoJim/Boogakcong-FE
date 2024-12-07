import React, {useState} from 'react';
import { Card, CardMedia, Box, Button, Typography } from '@mui/material';
import {PostType, UserRole} from "@/types";
import {blue} from "@mui/material/colors";
import {useAtomValue} from "jotai/index";
import {userIdAtom} from "@/state/authAtom";
import PostingEditor from "@/components/PostingEditor";
import {deletePost} from "@/app/api/post";
import {toast} from "react-toastify";

interface PostingViewerProps {
    id: number;
    title: string;
    content: string;
    userId: number;
    postType: PostType;
    imageUrl: string;
    createdAt: string;
    onUpdate: (id: number, title: string, content: string, image: File | string | null, postType) => void
}

const PostingViewer = ({ id, title, content, userId, postType, imageUrl, createdAt, onUpdate}: PostingViewerProps) => {
    const atomUserId = localStorage.getItem("userId") || null;
    const token = localStorage.getItem("accessToken") || null;
    const [isEditing, setIsEditing] = useState(false); // 에디터 모드 상태

    console.log("userId: ", userId);
    console.log("atomUserId: ", atomUserId);
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = (updatedTitle: string, updatedContent: string, updatedImage: File | string | null) => {
        onUpdate(id, updatedTitle, updatedContent, updatedImage, postType); // 업데이트 콜백 호출
        setIsEditing(false); // 에디터 모드 종료
    };

    if (isEditing) {
        return (
            <PostingEditor
                id={id}
                title={title}
                content={content}
                imageUrl={imageUrl}
                isEditMode={true}
                onSave={handleSave}
                onCancel={handleCancel}
                postType={postType}
            />
        );
    }

    const handleDelete = async () => {
        if (!window.confirm("정말로 삭제하시겠습니까?")) {
            return;
        }
        try {
            await deletePost(id, token); // deletePost는 서버 삭제 API 호출 함수
            toast.success("게시글이 삭제되었습니다.");
            window.location.reload();
        } catch (error) {
            console.error("게시글 삭제 중 오류 발생:", error);
            toast.error("게시글 삭제 중 문제가 발생했습니다.");
        }
    };

    return (
        <Card
            sx={{
                borderRadius: 5,
                width: 350,
                padding: 2,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* 제목 */}
            <Typography
                variant="h3"
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: 2,
                    marginTop: 4,
                }}
            >
                {title}
            </Typography>

            {/* 이미지 */}
            {imageUrl && (
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt="업로드된 이미지"
                    sx={{
                        width: '100%',
                        height: 200,
                        borderRadius: 3,
                        marginBottom: 2,
                    }}
                />
            )}

            {/* 태그 */}
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    padding: 0,
                    marginBottom: 2,
                    // 왼쪽
                    alignItems: 'left',
                }}
            >
                {postType === PostType.RECRUITMENT ? (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: '10px',
                            paddingX: 4,
                            paddingY: 1,
                            color: '#FFFFFF',
                            backgroundColor: blue[200],
                            '&:hover': {
                                backgroundColor: '#1976D2',
                            },
                        }}
                    >
                        모집글
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
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
                    >
                        후기글
                    </Button>
                )}
            </Box>

            {/* 내용 */}
            <Box sx={{ width: '100%', marginBottom: 4 }}>
                <Typography
                    variant="body1"
                    sx={{
                        width: '100%',
                        whiteSpace: 'pre-wrap',
                        textAlign: 'left',
                    }}
                >
                    {content}
                </Typography>
            </Box>

        {/*    내 글일 경우 수정 버튼*/}
            {atomUserId == userId && (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between', // 버튼 간 간격 균등 분배
                            gap: 2, // 버튼 사이의 간격
                            marginTop: 2, // 상단 여백
                            width: '100%', // 부모 박스 크기에 맞춤
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                flex: 1, // 버튼 크기 균등
                                borderRadius: '8px',
                                paddingY: 1.5,
                                color: '#FFFFFF',
                                backgroundColor: blue[200],
                                '&:hover': {
                                    backgroundColor: blue[300],
                                },
                            }}
                            onClick={handleEditClick}
                        >
                            수정
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                                flex: 1, // 버튼 크기 균등
                                borderRadius: '8px',
                                paddingY: 1.5,
                                color: blue[200], // 텍스트 색상
                                backgroundColor: '#FFFFFF', // 흰색 배경
                                border: `2px solid ${blue[200]}`, // 테두리 추가
                                '&:hover': {
                                    backgroundColor: blue[50], // 살짝 옅은 배경색
                                },
                            }}
                            onClick={handleDelete}
                        >
                            삭제
                        </Button>
                    </Box>
                </>
            )}
        </Card>
    );
};

export default PostingViewer;