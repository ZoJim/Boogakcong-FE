import React, { useEffect, useState } from "react";
import { Box, Button, CardMedia, Modal, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { PostType } from "@/types";
import {getPostAll, patchPost, savePost} from "@/app/api/post";

interface PostingEditorProps {
    id?: number; // 수정 모드일 경우 id가 필요
    title?: string;
    content?: string;
    imageUrl?: string;
    postType: PostType;
    onSave: (updatedTitle: string, updatedContent: string, updatedImage: File | string | null) => void;
    onCancel: () => void;
    isEditMode?: boolean; // 수정 모드 여부
}

const PostingEditor = ({
                           id,
                           title = "",
                           content = "",
                           imageUrl = "",
                           postType,
                           onSave,
                           onCancel,
                           isEditMode = false,
                       }: PostingEditorProps) => {
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedContent, setUpdatedContent] = useState(content);
    const [image, setImage] = useState<File | null>(null); // 업로드한 이미지 파일 상태
    const [preview, setPreview] = useState(imageUrl); // 이미지 미리보기
    const token = localStorage.getItem("accessToken") || null;

    useEffect(() => {
        // 초기값 설정
        setUpdatedTitle(title);
        setUpdatedContent(content);
        setPreview(imageUrl);
    }, [title, content, imageUrl]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // 미리보기 URL 생성
        }
    };

    // const handleSave = async () => {
    //     if (!id || !token || !postType) {
    //         console.error("필수 값(id, token, postType)이 누락되었습니다.", { id, token, postType });
    //         alert("필수 값이 누락되었습니다. 다시 시도해주세요.");
    //         console.log(id, token, postType);
    //         return;
    //     }
    //
    //     try {
    //         // API 호출
    //         await patchPost(id, updatedTitle, updatedContent, image, postType, token);
    //         // 상위 컴포넌트에 저장된 데이터 전달
    //         onSave(updatedTitle, updatedContent, image || preview);
    //         // 성공적으로 완료 후 Modal 닫기
    //         onCancel();
    //     } catch (error) {
    //         console.error("Error while updating post:", error);
    //         alert("게시글 수정 중 문제가 발생했습니다. 다시 시도해주세요.");
    //     }
    // };

    const handleSave = async () => {
        if (!token || !postType) {
            console.error("필수 값(token, postType)이 누락되었습니다.", { token, postType });
            alert("필수 값이 누락되었습니다. 다시 시도해주세요.");
            return;
        }

        try {
            if (isEditMode && id) {
                // 수정 모드
                await patchPost(id, updatedTitle, updatedContent, image, postType, token);
            } else {
                // 새 게시글 저장
                await savePost(updatedTitle, updatedContent, image, postType, token);
            }

            // 상위 컴포넌트에 저장된 데이터 전달
            onSave(updatedTitle, updatedContent, image || preview);
            // 성공적으로 완료 후 Modal 닫기
            onCancel();
            getPostAll();
        } catch (error) {
            console.error("Error while saving post:", error);
            alert("게시글 저장 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <Modal open={true} onClose={onCancel}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 350,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 4,
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {isEditMode ? "게시글 수정" : "새 게시글 작성"}
                </Typography>
                <TextField
                    label="제목"
                    fullWidth
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="내용"
                    fullWidth
                    multiline
                    rows={4}
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* 이미지 업로드 섹션 */}
                <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                    {preview ? (
                        <CardMedia
                            component="img"
                            image={preview}
                            alt="미리보기"
                            sx={{
                                width: "100%",
                                height: 200,
                                borderRadius: 2,
                                mb: 2,
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                height: 200,
                                border: "2px dashed lightgray",
                                borderRadius: 2,
                                mb: 2,
                                cursor: "pointer",
                            }}
                        >
                            <Typography sx={{ color: "gray" }}>이미지 업로드</Typography>
                        </Box>
                    )}
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button
                        sx={{ bgcolor: blue[200], color: "#FFFFFF" }}
                        variant="contained"
                        onClick={handleSave}
                    >
                        {isEditMode ? "수정 완료" : "저장"}
                    </Button>
                    <Button variant="outlined" onClick={onCancel}>
                        취소
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default PostingEditor;