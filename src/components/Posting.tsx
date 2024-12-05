import React, { useState, useEffect } from 'react';
import { TextField, Card, CardMedia, Box, Button, CardActions, Typography } from '@mui/material';

// Props 인터페이스 추가
interface PostingProps {
    onSubmit: (title: string, content: string, image: string) => void;
    isEditorMode?: boolean;
    title?: string;
    content?: string;
    imageUrl?: string;
}

const Posting = ({ onSubmit, isEditorMode = true, title, content, imageUrl }: PostingProps) => {
    const [currentTitle, setCurrentTitle] = useState(title || '');
    const [currentContent, setCurrentContent] = useState(content || '');
    const [image, setImage] = useState<File | null>(null); // 이미지 파일 상태
    const [preview, setPreview] = useState<string>(imageUrl || ''); // 이미지 미리보기 URL

    useEffect(() => {
        // Props 변경 시 상태 업데이트
        setCurrentTitle(title || '');
        setCurrentContent(content || '');
        setPreview(imageUrl || '');
    }, [title, content, imageUrl]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file); // 이미지 파일 저장
            setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
        }
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(currentTitle, currentContent, preview);
        }
    };

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
                {isEditorMode ? (
                    <TextField
                        label="제목"
                        id="title_textfield"
                        size="small"
                        value={currentTitle}
                        onChange={(e) => setCurrentTitle(e.target.value)}
                        sx={{
                            width: '100%',
                            borderRadius: 3,
                            marginBottom: 2,
                            marginTop: 4,
                        }}
                    />
                ) : (
                    <Typography
                        variant="h3"
                        sx={{
                            width: '100%',
                            textAlign: 'center',
                            marginBottom: 2,
                            marginTop: 4,
                        }}
                    >
                        {currentTitle}
                    </Typography>
                )}

                {/* 이미지 업로드 영역 */}
                {isEditorMode && !preview && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: 200,
                            border: '2px dashed lightgray',
                            borderRadius: 3,
                            marginBottom: 1,
                            cursor: 'pointer',
                            backgroundColor: '#f9f9f9',
                            position: 'relative',
                        }}
                    >
                        <label htmlFor="image-upload" style={{ cursor: 'pointer', textAlign: 'center' }}>
                            <span style={{ color: 'gray', fontSize: '16px', fontWeight: 'bold' }}>
                                이미지 업로드
                            </span>
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange} // 이미지 파일 선택 핸들러
                        />
                    </Box>
                )}

                {/* 업로드된 이미지 미리보기 */}
                {preview && (
                    <CardMedia
                        component="img"
                        image={preview}
                        alt="업로드된 이미지"
                        sx={{
                            width: '100%',
                            height: 200,
                            borderRadius: 3,
                            marginBottom: 2,
                        }}
                    />
                )}

                {/* 내용 */}
                {isEditorMode ? (
                    <Box sx={{ width: '100%', marginBottom: 4 }}>
                        <TextField
                            id="content_textfield"
                            label="작성글"
                            multiline
                            rows={4}
                            fullWidth
                            value={currentContent}
                            onChange={(e) => setCurrentContent(e.target.value)}
                        />
                    </Box>
                ) : (
                    <Typography
                        variant="body1"
                        sx={{
                            width: '100%',
                            marginBottom: 4,
                            whiteSpace: 'pre-wrap',
                            textAlign: 'left',
                        }}
                    >
                        {currentContent}
                    </Typography>
                )}
            </Card>

            {/* 완료 버튼 */}
            {isEditorMode && (
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
                        onClick={handleSubmit} // 완료 버튼 클릭 시 handleSubmit 호출
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
                        완료
                    </Button>
                </Box>
            )}
        </>
    );
};

export default Posting;