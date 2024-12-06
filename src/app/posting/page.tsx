'use client';

import React, { useState } from 'react';
import { Backdrop, Box, CardMedia, Chip, Typography } from '@mui/material';
import PostingList from "@/components/PostingList";
import NavigationBar from "@/components/Navigation";
import { blue } from "@mui/material/colors";
import { Posting, PostType } from "@/types";
import postings from "@/mocks/postings";
import PostingViewer from "@/components/PostViewer";

const Page = () => {
    const [selectedPosting, setSelectedPosting] = useState<Posting | null>(null); // 선택된 게시글 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [selectedFilter, setSelectedFilter] = useState<PostType | null>(null); // 필터 상태 (RECRUITMENT, REVIEW)

    const handlePostingClick = (postId: number) => {
        // FIXME: 아래 코드는 임시로 작성한 코드입니다
        // 실제로는 서버에서 카페 정보를 가져와야 합니다.
        setSelectedPosting(
            {
                id: 4,
                title: '✨ 부산대 최고 유일무이카페 오픈',
                content: '안녕하세요 ~ :) 유일무이 카페입니다. 커피 1번 리필 가능해요~! 얼마전에 오픈했으니 자주 와주세요! 그리고 부산대 이벤트 중이니 친구들과 함께 방문하시면 특별한 혜택을 드립니다. 따뜻한 분위기와 고급스러운 커피를 즐기실 수 있어요. 많이 찾아와주세요!',
                userId: 5,
                postType: PostType.REVIEW,
                imageUrl: 'https://zojim.s3.ap-northeast-2.amazonaws.com/750_750_20240408112440752_photo_5399cfbe4e71.jpg',
                createdAt: '2024-12-05T15:00:00',
            }
        );
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setSelectedPosting(null);
        setIsModalOpen(false);
    };

    // 필터된 게시글 목록
    const filteredPostings = selectedFilter
        ? postings.filter(posting => posting.postType === selectedFilter)
        : postings;

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
                    <Box onClick={() => handlePostingClick(0)}>
                        <PostingList
                            title={postings[0].title}
                            content={postings[0].content}
                            createdAt={postings[0].createdAt}
                            imageUrl={postings[0].imageUrl}
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