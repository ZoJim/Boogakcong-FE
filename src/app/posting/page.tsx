'use client';

import React, { useState, useEffect } from 'react';
import { Backdrop, Box, CardMedia, Chip, Typography } from '@mui/material';
import PostingList from "@/components/PostingList";
import NavigationBar from "@/components/Navigation";
import { blue } from "@mui/material/colors";
import { Posting, PostType } from "@/types";
import PostingViewer from "@/components/PostViewer";
import {getPostAll, getTopPost} from "@/app/api/post";

const Page = () => {
    const [selectedPosting, setSelectedPosting] = useState<Posting | null>(null); // 선택된 게시글 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [selectedFilter, setSelectedFilter] = useState<PostType | null>(null); // 필터 상태 (RECRUITMENT, REVIEW)
    const [postings, setPostings] = useState<Posting[]>([]); // 전체 게시글 상태
    const [filteredPostings, setFilteredPostings] = useState<Posting[]>([]); // 필터링된 게시글 상태
    const [topPosting, setTopPosting] = useState<Posting | null>(null); // 인기 글 상태

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
        if (selected) {
            setSelectedPosting(selected);
            setIsModalOpen(true); // 모달 열기
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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CardMedia
                            component="img"
                            src="/images/popular.png"
                            alt="인기 글"
                            sx={{ width: 30, height: 30, mr: 1 }}
                        />
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: "#ffffff" }}>
                            인기 글
                        </Typography>
                    </Box>
                    <Box onClick={() => handlePostingClick(4)}>
                        <PostingList
                            title = {topPosting?.title as string}
                            content = {topPosting?.content as string}
                            createdAt = {topPosting?.createdAt as string}
                            imageUrl = {topPosting?.imageUrl as string}
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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CardMedia
                            component="img"
                            src="/images/list.png"
                            alt="목록"
                            sx={{ width: 30, height: 30, mr: 1 }}
                        />
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: "#ffffff" }}>
                            목록
                        </Typography>
                        <Box sx={{ marginLeft: 'auto' }}>
                            {/* 필터 Chip 추가 */}
                            <Chip
                                label="모집글"
                                color={selectedFilter === PostType.RECRUITMENT ? 'primary' : 'default'}
                                onClick={() => setSelectedFilter(PostType.RECRUITMENT)}
                                sx={{ marginRight: 1, backgroundColor: selectedFilter === PostType.RECRUITMENT ? "#90caf9" : undefined }}
                            />
                            <Chip
                                label="후기글"
                                color={selectedFilter === PostType.REVIEW ? 'primary' : 'default'}
                                onClick={() => setSelectedFilter(PostType.REVIEW)}
                                sx={{ backgroundColor: selectedFilter === PostType.REVIEW ? "#90caf9" : undefined }}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2, // 각 게시물 간 간격 추가
                            maxHeight: '395px',
                            overflowY: 'auto',
                        }}
                    >
                        {filteredPostings.map((posting, index) => (
                            <Box
                                key={index}
                                onClick={() => handlePostingClick(posting.id)}
                                sx={{ cursor: 'pointer' }}
                            >
                                <PostingList
                                    title={posting.title}
                                    content={posting.content}
                                    createdAt={posting.createdAt}
                                    imageUrl={posting.imageUrl}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* 네비게이션 바 */}
            <NavigationBar />

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
                        <PostingViewer {...selectedPosting} />
                    </Box>
                )}
            </Backdrop>
        </Box>
    );
};

export default Page;