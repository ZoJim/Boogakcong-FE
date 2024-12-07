'use client';

import React, {useEffect, useState} from 'react';
import {Backdrop, Box, Button, CardMedia, Chip, Typography} from '@mui/material';
import PostingList from "@/components/PostingList";
import NavigationBar from "@/components/Navigation";
import {blue, grey} from "@mui/material/colors";
import {Posting, PostType} from "@/types";
import PostingViewer from "@/components/PostViewer";
import {getPostAll, getTopPost, patchPost} from "@/app/api/post";
import {toast, ToastContainer} from "react-toastify";
import PostingEditor from "@/components/PostingEditor";

const Page = () => {
    const [selectedPosting, setSelectedPosting] = useState<Posting | null>(null); // 선택된 게시글 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [selectedFilter, setSelectedFilter] = useState<PostType | null>(null); // 필터 상태 (RECRUITMENT, REVIEW)
    const [postings, setPostings] = useState<Posting[]>([]); // 전체 게시글 상태
    const [filteredPostings, setFilteredPostings] = useState<Posting[]>([]); // 필터링된 게시글 상태
    const [topPosting, setTopPosting] = useState<Posting | null>(null); // 인기 글 상태
    const token = localStorage.getItem("accessToken") || null;
    const [isEditorOpen, setIsEditorOpen] = useState(false); // 새 포스팅 모달 상태
    const [error, setError] = useState<string | null>(null);

    // 서버에서 게시글 목록을 가져오는 함수
    useEffect(() => {
        const fetchPostings = async () => {
            try {
                const res = await getPostAll();
                if (Array.isArray(res)) {
                    setPostings(res);
                    setFilteredPostings(res);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (error) {
                console.error("Error fetching postings:", error);
            }
        };

        const fetchTopPost = async () => {
            try {
                const topPost = await getTopPost();
                setTopPosting(topPost);
            } catch (error) {
                console.error("Error fetching top post:", error);
            }
        };

        fetchPostings();
        fetchTopPost();
    }, []);

    // 필터가 변경될 때마다 필터링된 게시글 목록 업데이트
    useEffect(() => {
        if (selectedFilter) {
            setFilteredPostings(postings.filter(posting => posting.postType === selectedFilter));
        } else {
            setFilteredPostings(postings); // 필터가 없으면 전체 게시글을 표시
        }
    }, [selectedFilter, postings]); // 필터나 게시글 목록이 변경될 때마다 실행

    const handlePostingClick = (postId: number) => {
        const selected = postings.find(posting => posting.id === postId);
        console.log("selected:", selected);
        if (selected) {
            setSelectedPosting(selected);
            setIsModalOpen(true); // 모달 열기
        }
    };


    const handleNewPostSave = (newPost: Posting) => {
        setPostings((prev) => [newPost, ...prev]);
        setFilteredPostings((prev) => [newPost, ...prev]);
        setIsEditorOpen(false);
        getPostAll().then((res) => {
            setPostings(res);
            setFilteredPostings(res);
        })

        toast.success("새 게시글이 성공적으로 추가되었습니다.");
    };

    const handlePostUpdate = async (
        id: number,
        updatedTitle: string,
        updatedContent: string,
        updatedImage: File | string | null,
        postType: PostType
    ) => {
        try {
            if (!token) {
                toast.error("로그인이 필요합니다.");
                return;
            }

            // 서버에 수정된 데이터 저장
            await patchPost(id, updatedTitle, updatedContent, updatedImage, postType, token);

            // 클라이언트 상태 업데이트
            setPostings((prevPostings) =>
                prevPostings.map((post) =>
                    post.id === id
                        ? {...post, title: updatedTitle, content: updatedContent, imageUrl: updatedImage as string}
                        : post
                )
            );
            closeModal();
            toast.success("게시글이 성공적으로 수정되었습니다.");
        } catch (error) {
            console.error("게시글 수정 중 오류 발생:", error);
            toast.error("게시글 수정 중 문제가 발생했습니다.");
        }

    };

    const closeModal = () => {
        setSelectedPosting(null);
        setIsModalOpen(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                bgcolor: blue[200],
                position: 'relative',
                gap: 3, // 각 섹션 사이에 공간 추가
            }}
        >
            <ToastContainer/>
            {error && (
                <Typography color="error" sx={{mb: 2}}>
                    {error}
                </Typography>
            )}

            {/* 스크롤 영역 */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    mt: 3,
                }}
            >
                {/* 인기 글 섹션 */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2, // 내부 아이템 간 간격 추가
                        mb: 4,
                    }}
                >
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                        <CardMedia
                            component="img"
                            src="/images/popular.png"
                            alt="인기 글"
                            sx={{width: 30, height: 30, mr: 1}}
                        />
                        <Typography variant="h3" sx={{fontWeight: 'bold', color: "#ffffff"}}>
                            인기 글
                        </Typography>
                    </Box>
                    <Box onClick={() => handlePostingClick(4)}>
                        <PostingList
                            title={topPosting?.title as string}
                            content={topPosting?.content as string}
                            createdAt={topPosting?.createdAt as string}
                            imageUrl={topPosting?.imageUrl as string}
                        />
                    </Box>
                </Box>

                {/* 목록 섹션 */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2, // 목록 섹션 사이 간격 추가
                    }}
                >
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                        <CardMedia
                            component="img"
                            src="/images/list.png"
                            alt="목록"
                            sx={{width: 30, height: 30, mr: 1}}
                        />
                        <Typography variant="h3" sx={{fontWeight: 'bold', color: "#ffffff"}}>
                            목록
                        </Typography>
                        <Box sx={{marginLeft: 'auto'}}>
                            {/* 필터 Chip 추가 */}
                            <Chip
                                label="모집글"
                                color={selectedFilter === PostType.RECRUITMENT ? 'primary' : 'default'}
                                onClick={() => setSelectedFilter(PostType.RECRUITMENT)}
                                sx={{
                                    marginRight: 1,
                                    backgroundColor: selectedFilter === PostType.RECRUITMENT ? "#90caf9" : undefined
                                }}
                            />
                            <Chip
                                label="후기글"
                                color={selectedFilter === PostType.REVIEW ? 'primary' : 'default'}
                                onClick={() => setSelectedFilter(PostType.REVIEW)}
                                sx={{backgroundColor: selectedFilter === PostType.REVIEW ? "#90caf9" : undefined}}
                            />

                            <Button
                                variant="contained"
                                onClick={() => setIsEditorOpen(true)}
                                sx={{
                                    ml: 2,
                                    borderRadius: 8,
                                    color: grey[800], // 텍스트 색상을 은은한 검은색으로 설정
                                    backgroundColor: grey[300], // 기본 Chip과 비슷한 은은한 회색
                                    opacity: 0.9, // 약간의 불투명도 추가
                                    '&:hover': {
                                        backgroundColor: grey[400], // Hover 시 약간 더 진한 회색
                                    },
                                }}
                            >
                                작성
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2, // 각 게시물 간 간격 추가
                            maxHeight: '360px',
                            overflowY: 'auto',
                        }}
                    >
                        {filteredPostings.map((posting, index) => (
                            <Box
                                key={index}
                                onClick={() => handlePostingClick(posting.id)}
                                sx={{cursor: 'pointer'}}
                            >
                                <PostingList
                                    title={posting.title}
                                    content={posting.content}
                                    createdAt={posting.createdAt}
                                    userId={posting.userId}
                                    imageUrl={posting.imageUrl}
                                    onClick={() => handlePostingClick(posting.id)}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* 네비게이션 바 */}
            <NavigationBar/>

            {/* 모달 영역 */}
            <Backdrop
                open={isModalOpen}
                sx={{
                    zIndex: 1000,
                    flexDirection: 'column',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backdropFilter: 'blur(4px)', // 블러 효과
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}
                onClick={closeModal}
            >
                {selectedPosting && (
                    <Box
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            borderRadius: 4,
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <PostingViewer
                            id={selectedPosting.id}
                            title={selectedPosting.title}
                            content={selectedPosting.content}
                            imageUrl={selectedPosting.imageUrl}
                            postType={selectedPosting.postType}
                            userId={selectedPosting.userId}
                            createdAt={selectedPosting.createdAt}
                            onUpdate={handlePostUpdate}
                        />
                    </Box>
                )}
            </Backdrop>
            {/* 새 글 작성 모달 */}
            {isEditorOpen && (
                <PostingEditor
                    postType={selectedFilter || PostType.RECRUITMENT}
                    onSave={handleNewPostSave}
                    onCancel={() => setIsEditorOpen(false)}
                />
            )}
        </Box>
    );
};

export default Page;