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
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/navigation';

const Page = () => {
    const token = useAtomValue(accessTokenAtom);
    const router = useRouter();
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
        e.stopPropagation();
        setSelectedReview(null);
        setIsReviewModalOpen(false);
    };

    const closePostingModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedPosting(null);
        setIsPostingModalOpen(false);
    };

    const [isRedirecting, setIsRedirecting] = useState(false);

    const handle403Error = () => {
        if (!isRedirecting) {
            setIsRedirecting(true);
            toast.error('로그인이 필요합니다.', {
                position: 'top-center',
                autoClose: 3000,
            });
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        }
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

    const fetchUserInfo = async () => {
        if (!token) {
            handle403Error();
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
        } catch (err: any) {
            if (err.response?.status === 403) {
                handle403Error();
            } else {
                console.error('Error fetching user info:', err);
                setError('사용자 정보를 가져오는 데 실패했습니다.');
            }
        }
    };

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
        } catch (err: any) {
            if (err.response?.status === 403) {
                handle403Error();
            } else {
                console.error('Error fetching my reviews:', err);
            }
        }
    };

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
        } catch (err: any) {
            if (err.response?.status === 403) {
                handle403Error();
            } else {
                console.error('Error fetching my posts:', err);
            }
        }
    };

    useEffect(() => {
        if (!token) {
            handle403Error();
        } else {
            fetchUserInfo();
            fetchMyReviews();
            fetchMyPosts();
        }
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
            <ToastContainer />
            {error && (
                <Typography color="error" sx={{mb: 2}}>
                    {error}
                </Typography>
            )}


            {userInfo && (
                <Box sx={{ width: '100%', px: 3, mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.5, mt: -8, mb: 1 }}>
                        <CardMedia
                            component="img"
                            src="/images/mypage_white.png"
                            alt="회원 정보"
                            sx={{ width: 20, height: 20, mr: 1 }}
                        />
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
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

            <Box sx={{ width: '100%', px: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ffffff', mb: 2 }}>
                    내가 쓴 게시글
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        maxHeight: '400px',
                        overflowY: 'auto',
                    }}
                >
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Box
                                key={post.id}
                                sx={{
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <PostingList
                                    title={post.title}
                                    content={post.content}
                                    createdAt={post.createdAt}
                                    imageUrl={post.imageUrl}
                                    onClick={() => openPostingModal(post)}
                                />
                            </Box>
                        ))
                    ) : (
                        <Typography sx={{ color: '#ffffff' }}>아직 작성한 게시글이 없습니다.</Typography>
                    )}
                </Box>
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