import React from 'react';
import { Card, CardMedia, Box, Button, CardActions, Typography } from '@mui/material';

// Props 인터페이스 정의
interface PostViewProps {
    title: string;
    content: string;
    image: string; // 미리보기 이미지 URL
}

const PostView: React.FC<PostViewProps> = ({ title, content, image }) => {
    return (
        <>
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
                    variant="h6"
                    sx={{
                        width: '100%',
                        borderRadius: 3,
                        marginBottom: 2,
                        marginTop: 4,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    {title}
                </Typography>

                {/* 업로드된 이미지 */}
                <CardMedia
                    component="img"
                    image={image}
                    alt="업로드된 이미지"
                    sx={{
                        width: '100%',
                        height: 200,
                        borderRadius: 3,
                        marginBottom: 2,
                    }}
                />


                {/* 모집글, 후기글 버튼 */}
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end', // 우측 정렬
                        gap: 0.4,
                        width: '100%',
                        marginBottom: 1,
                    }}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            borderRadius: '20px',
                            paddingX: 1,
                            paddingY: 0.7,
                            borderColor: '#2196F3', // 외곽선 색상
                            color: '#2196F3', // 텍스트 색상
                            '&:hover': {
                                backgroundColor: '#BBDEFB', // hover 효과, #BBDEFB = BLUE/100
                                borderColor: '#2196F3', // #2196F3 = BLUE/500
                            },
                        }}
                    >
                        모집글
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            borderRadius: '20px',
                            paddingX: 1,
                            paddingY: 0.7,
                            backgroundColor: '#2196F3', // 버튼 배경색
                            color: '#FFFFFF', // 텍스트 색상
                            '&:hover': {
                                backgroundColor: '#1976D2', // hover 효과
                            },
                        }}
                    >
                        후기글
                    </Button>
                </CardActions>


                {/* 글 내용 */}
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <img
                        src="/images/sanjinee.png" // 하단 마스코트 이미지 경로
                        alt="마스코트"
                        style={{ width: 40, height: 40 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        {content}
                    </Typography>
                </Box>

            </Card>

            {/* 수정 버튼 */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center', // 중앙 정렬
                    marginTop: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    //onClick={handleSubmit} // 완료 버튼 클릭 시 handleSubmit 호출
                    sx={{
                        borderRadius: '10px',
                        paddingX: 4,
                        paddingY: 1,
                        backgroundColor: '#2196F3',
                        '&:hover': {
                            backgroundColor: '#1976D2',
                        },
                    }}
                >
                    수정하기
                </Button>
            </Box>

        </>
    );
};

export default PostView;
