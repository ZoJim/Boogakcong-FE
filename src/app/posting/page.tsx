'use client';

import React, {useState} from 'react';
import {Box, Typography, Button, CardMedia, Backdrop} from '@mui/material';
import PostingList from "@/components/PostingList";
import NavigationBar from "@/components/Navigation";
import Posting from "@/components/Posting";
import {blue} from "@mui/material/colors";
import postings from "@/mocks/postings";
import CafeViewer from "@/components/CafeViewer";

const Page = () => {
    const [selectedPosting, setSelectedPosting] = useState(null); // 선택된 게시글 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    const handlePostingClick = (posting: any) => {
        setSelectedPosting(posting);
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setSelectedPosting(null);
        setIsModalOpen(false); // 모달 닫기
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
                position: 'relative', // Backdrop를 사용하기 위해
            }}
        >
            {/* 스크롤 영역 */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    width: '100%',
                    padding: '16px',
                    mt: 3,
                }}
            >
                {/* 인기 글 섹션 */}
                <Box sx={{mb: 4}}>
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
                    <Box onClick={() => handlePostingClick(postings[0])}>
                        <PostingList
                            title={postings[0].title}
                            content={postings[0].content}
                            createdAt={postings[0].createdAt}
                        />
                    </Box>
                </Box>

                {/* 목록 섹션 */}
                <Box>
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
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        {postings.map((posting, index) => (
                            <Box
                                key={index}
                                onClick={() => handlePostingClick(posting)}
                                sx={{cursor: 'pointer'}} // 클릭 가능하도록 스타일 추가
                            >
                                <PostingList
                                    title={posting.title}
                                    content={posting.content}
                                    createdAt={posting.createdAt}
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
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 어두운 배경
                }}
                onClick={closeModal} // 모달 닫기
            >
                {selectedPosting && (
                    <Box
                        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
                    >
                        <Posting
                            sx={{
                                display: 'flex',
                                padding: 3,
                                borderRadius: 4,
                                backgroundColor: '#fff',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',

                            }}
                            onClick={(e) => e.stopPropagation()}
                            title={selectedPosting.title}
                            content={selectedPosting.content}
                            createdAt={selectedPosting.createdAt}
                            imageUrl={selectedPosting.imageUrl}
                            isEditorMode={false}
                        />
                    </Box>
                )}
            </Backdrop>
        </Box>
    );
};

export default Page;