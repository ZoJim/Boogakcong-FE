import React from 'react';
import { TextField, Card, CardMedia, Box, Button, CardActions, Typography } from '@mui/material';
import { PostType } from "@/types";

interface PostingViewerProps {
    id: number;
    title: string;
    content: string;
    userId: number;
    postType: PostType;
    imageUrl: string;
    createdAt: string;
}

const PostingViewer = ({ id, title, content, userId, postType, imageUrl, createdAt }: PostingViewerProps) => {
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

            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    padding: 0,
                    marginBottom: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: '10px',
                        paddingX: 4,
                        paddingY: 1,
                        color: '#FFFFFF',
                        backgroundColor: '#2196F3',
                        '&:hover': {
                            backgroundColor: '#1976D2',
                        },
                    }}
                >
                    모집글
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: '10px',
                        paddingX: 4,
                        paddingY: 1,
                        color: '#FFFFFF',
                        backgroundColor: '#2196F3',
                        '&:hover': {
                            backgroundColor: '#1976D2',
                        },
                    }}
                >
                    후기글
                </Button>
            </CardActions>

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
        </Card>
    );
};

export default PostingViewer;