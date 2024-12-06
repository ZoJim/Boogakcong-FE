'use client';

import React, {useState, useEffect} from 'react';
import {Backdrop, Box, Button, CardMedia, TextField, Typography} from '@mui/material';
import {blue} from '@mui/material/colors';
import Navigation from '@/components/Navigation';
import PostingList from '@/components/PostingList';
import ShortReview from '@/components/ShortReview';
import UserInfo from '@/components/UserInfo';
import {getUser} from '@/app/api/user';
import {deleteReview, getMyReview, updateReview} from '@/app/api/review';
import {useAtomValue} from 'jotai';
import {accessTokenAtom} from '@/state/authAtom';
import {Posting, UserRole} from '@/types';
import {getMyPost} from '@/app/api/post';
import PostingViewer from '@/components/PostViewer';

const Page = () => {
    const token = useAtomValue(accessTokenAtom);
    const [userInfo, setUserInfo] = useState<{
        name: string;
        role: UserRole;
        email: string;
    } | null>(null);
    const [reviews, setReviews] = useState<
        { id: number; cafeName: string; content: string; createdAt: string }[]
    >([]);
    const [posts, setPosts] = useState<
        { id: number; title: string; content: string; createdAt: string; imageUrl: string }[]
    >([]);
    const [error, setError] = useState<string | null>(null);

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<{
        id: number;
        content: string;
    } | null>(null);

    const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);
    const [selectedPosting, setSelectedPosting] = useState<Posting | null>(null);

    const openReviewModal = (reviewId: number, currentContent: string) => {
        setSelectedReview({id: reviewId, content: currentContent});
        setIsReviewModalOpen(true);
    };

    const openPostingModal = (post: Posting) => {
        setSelectedPosting(post);
        setIsPostingModalOpen(true);
    };

    const closeReviewModal = (e: React.MouseEvent) => {
        e.stopPropagation(); // 클릭 이벤트 전파 방지
        setSelectedReview(null);
        setIsReviewModalOpen(false);
    };

    const closePostingModal = (e: React.MouseEvent) => {
        e.stopPropagation(); // 클릭 이벤트 전파 방지
        setSelectedPosting(null);
        setIsPostingModalOpen(false);
    };

    const handleSaveReview = async () => {
        if (!selectedReview || !token) return;

        try {
            await updateReview(token, selectedReview.id, selectedReview.content);
            setReviews((prev) =>
                prev.map((review) =>
                    review.id === selectedReview.id ? {...review, content: selectedReview.content} : review
                )
            );
            setIsReviewModalOpen(false);
        } catch (err) {
            console.error('Error updating review:', err);
        }
    };

    const handleDeleteReview = async () => {
        if (!selectedReview || !token) return;

        try {
            await deleteReview(token, selectedReview.id);
            setReviews((prev) => prev.filter((review) => review.id !== selectedReview.id));
            setIsReviewModalOpen(false);
        } catch (err) {
            console.error('Error deleting review:', err);
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!token) {
                setError('로그인이 필요합니다.');
                return;
            }

            try {
                const user = await getUser(token);
                setUserInfo({
                    name: user.name,
                    role: user.role,
                    email: user.email,
                });
                setError(null);
            } catch (err) {
                console.error('Error fetching user info:', err);
                setError('사용자 정보를 가져오는 데 실패했습니다.');
            }
        };

        fetchUserInfo();
    }, [token]);

    useEffect(() => {
        const fetchMyReviews = async () => {
            if (!token) return;

            try {
                const response = await getMyReview(token);
                setReviews(
                    response.map((review: any) => ({
                        id: review.id,
                        cafeName: review.cafeName,
                        content: review.content,
                        createdAt: review.createdAt,
                    }))
                );
            } catch (err) {
                console.error('Error fetching my reviews:', err);
            }
        };

        fetchMyReviews();
    }, [token]);

    useEffect(() => {
        const fetchMyPosts = async () => {
            if (!token) return;

            try {
                const response = await getMyPost(token);
                setPosts(
                    response.map((post: any) => ({
                        id: post.id,
                        title: post.title,
                        content: post.content,
                        createdAt: post.createdAt,
                        imageUrl: post.imageUrl,
                    }))
                );
            } catch (err) {
                console.error('Error fetching my posts:', err);
            }
        };

        fetchMyPosts();
    }, [token]);

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
            }}
        >
            {error && (
                <Typography color="error" sx={{mb: 2}}>
                    {error}
                </Typography>
            )}

            {userInfo && (
                <Box sx={{width: '100%', px: 3, mb: 1}}>
                    <Box sx={{display: 'flex', alignItems: 'center', ml: 0.5, mt: -8, mb: 1}}>
                        <CardMedia
                            component="img"
                            src="/images/mypage_white.png"
                            alt="회원 정보"
                            sx={{width: 20, height: 20, mr: 1}}
                        />
                        <Typography variant="h3" sx={{fontWeight: 'bold', color: '#ffffff'}}>
                            회원 정보
                        </Typography>
                    </Box>
                    <UserInfo
                        name={userInfo.name}
                        role={UserRole[userInfo.role]}
                        email={userInfo.email}
                    />
                </Box>
            )}

            <Box sx={{width: '100%', px: 3}}>
                <Typography variant="h3" sx={{fontWeight: 'bold', color: '#ffffff', mb: 2}}>
                    내가 쓴 후기
                </Typography>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ShortReview
                            key={review.id}
                            cafeName={review.cafeName}
                            content={review.content}
                            createdAt={review.createdAt}
                            onClick={() =>
                                openReviewModal(review.id, review.content)
                        }
                        />
                    ))
                ) : (
                    <Typography sx={{color: '#ffffff'}}>아직 작성한 리뷰가 없습니다.</Typography>
                )}
            </Box>

            <Box sx={{width: '100%', px: 3}}>
                <Typography variant="h3" sx={{fontWeight: 'bold', color: '#ffffff', mb: 2}}>
                    내가 쓴 게시글
                </Typography>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostingList
                            key={post.id}
                            title={post.title}
                            content={post.content}
                            createdAt={post.createdAt}
                            imageUrl={post.imageUrl}
                            onClick={() => openPostingModal(post)}
                        />
                    ))
                ) : (
                    <Typography sx={{color: '#ffffff'}}>아직 작성한 게시글이 없습니다.</Typography>
                )}
            </Box>

            <Navigation/>

            <Backdrop open={isReviewModalOpen} onClick={closeReviewModal}>
                {selectedReview && (
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            p: 3,
                            borderRadius: 2,
                            width: '400px',
                        }}
                        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
                    >
                        <Typography variant="h6">리뷰 수정</Typography>
                        <TextField
                            fullWidth
                            value={selectedReview.content}
                            onChange={(e) =>
                                setSelectedReview((prev) => (prev ? {...prev, content: e.target.value} : prev))
                            }
                            multiline
                            rows={4}
                        />
                        <Button onClick={handleSaveReview} sx={{mt: 2}}>저장</Button>
                        <Button onClick={handleDeleteReview} sx={{mt: 2}}>삭제</Button>
                    </Box>
                )}
            </Backdrop>

            <Backdrop open={isPostingModalOpen} onClick={closePostingModal}>
                {selectedPosting && (
                    <Box
                        sx={{
                            borderRadius: 4,
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                        }}
                        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
                    >
                        <PostingViewer {...selectedPosting} />
                    </Box>
                )}
            </Backdrop>
        </Box>
    );
};

export default Page;