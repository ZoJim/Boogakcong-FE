'use client';

import { Box, Typography, Button, CardMedia } from '@mui/material';
import PostingList from "@/components/PostingList";
import NavigationBar from "@/components/Navigation";
import { blue } from "@mui/material/colors";
import postings from "@/mocks/postings";

const Page = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                bgcolor: blue[200]
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
                <Box sx={{ mb: 4 }}>
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
                    <PostingList
                        title={postings[0].title}
                        content={postings[0].content}
                        createdAt={postings[0].createdAt}
                    />
                </Box>

                {/* 목록 섹션 */}
                <Box>
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
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {postings.map((posting, index) => (
                            <PostingList
                                key={index}
                                title={posting.title}
                                content={posting.content}
                                createdAt={posting.createdAt}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* 네비게이션 바 */}
            <NavigationBar />
        </Box>
    );
};

export default Page;