import React, { useState } from 'react';
import { TextField, Card, CardMedia, Box, Button, CardActions } from '@mui/material';

// Props 인터페이스 추가
interface PostingProps {
    onSubmit: (title: string, content: string, image: string) => void;
}

const Posting = ({ onSubmit }: PostingProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null); // 이미지 파일 상태
    const [preview, setPreview] = useState<string>(''); // 이미지 미리보기 URL

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file); // 이미지 파일 저장
            setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
        }
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(title, content, preview); // title, content, preview를 전달
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
                <TextField
                    label="제목"
                    id="title_textfield"
                    size="small"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        width: '100%',
                        borderRadius: 3,
                        marginBottom: 2,
                        marginTop: 4,
                    }}
                />

                {/* 이미지 업로드 영역 */}
                {!preview && (
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

                {/* 내용 */}
                <Box sx={{ width: '100%', marginBottom: 4 }}>
                    <TextField
                        id="content_textfield"
                        label="작성글"
                        multiline
                        rows={4}
                        fullWidth
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Box>
            </Card>

            {/* 완료 버튼 */}
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
        </>
    );
};

export default Posting;
