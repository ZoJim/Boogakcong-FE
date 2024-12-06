'use client';

import React, { useState, useEffect } from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import Navigation from '@/components/Navigation';
import PostingList from '@/components/PostingList';
import ShortReview from '@/components/ShortReview';
import UserInfo from '@/components/UserInfo';
import { getUser } from '@/app/api/user'; // getMyReview 추가
import { getMyReview } from '@/app/api/review';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/state/authAtom';
import { UserRole } from '@/types';
import {getMyPost} from "@/app/api/post";

const Page = () => {
    const token = useAtomValue(accessTokenAtom); // Access Token 가져오기
    const [userInfo, setUserInfo] = useState<{
        name: string;
        role: UserRole;
        email: string;
    } | null>(null);
    const [reviews, setReviews] = useState<
        { id: number; cafeName: string; content: string; createdAt: string }[]
    >([]);

    const [post, setPost] = useState<
        { id: number; cafeName: string; content: string; createdAt: string }[]
    >([]);

    const [error, setError] = useState<string | null>(null); // 에러 상태 관리

    // Fetch user info
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
                setError(null); // 에러 초기화
            } catch (err: any) {
                console.error('Error fetching user info:', err);
                setError('사용자 정보를 가져오는 데 실패했습니다.');
            }
        };

        fetchUserInfo();
    }, [token]);

    // Fetch reviews written by the user
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
            } catch (err: any) {
                console.error('Error fetching my reviews:', err);
            }
        };

        fetchMyReviews();
    }, [token]);


    // Fetch posts written by the user

    useEffect(() => {
        const fetchMyPosts = async () => {
            if (!token) return;

            try {
                const response = await getMyPost(token);
                setPost(
                    response.map((post: any) => ({
                        id: post.id,
                        title: post.title,
                        content: post.content,
                        userId: post.userId,
                        postType: post.postType,
                        imageUrl: post.imageUrl,
                        createdAt: post.createdAt,
                    }))
                );
            } catch (err: any) {
                console.error('Error fetching my reviews:', err);
            }
        };

        fetchMyPosts();
    }, [token]);

    const handleEditCafe = () => {
        console.log('내 카페 수정 클릭됨');
    };

    const handleDeleteCafe = () => {
        console.log('카페 삭제 요청 클릭됨');
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
            }}
        >
            {/* Error Message */}
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {/* User Info */}
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
                        onEditCafe={handleEditCafe}
                        onDeleteCafe={handleDeleteCafe}
                    />
                </Box>
            )}

            {/* 내가 쓴 후기 */}
            <Box sx={{ width: '100%', px: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 0 }}>
                    <CardMedia
                        component="img"
                        src="/images/list.png"
                        alt="내가 쓴 후기"
                        sx={{ width: 30, height: 30, mr: 1 }}
                    />
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                        내가 쓴 후기
                    </Typography>
                </Box>

                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ShortReview
                            key={review.id}
                            cafeName={review.cafeName}
                            content={review.content}
                            createdAt={review.createdAt}
                        />
                    ))
                ) : (
                    <Typography sx={{ color: '#ffffff', mt: 2 }}>
                        아직 작성한 리뷰가 없습니다.
                    </Typography>
                )}
            </Box>

            {/* 내가 쓴 게시글 */}
            <Box sx={{ width: '100%', px: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 0 }}>
                    <CardMedia
                        component="img"
                        src="/images/list.png"
                        alt="내가 쓴 게시글"
                        sx={{ width: 30, height: 30, mr: 1 }}
                    />
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                        내가 쓴 게시글
                    </Typography>
                </Box>

                {post.length > 0 ? (
                    post.map((post) => (
                        <PostingList
                            key={post.id}
                            title={post.title}
                            content={post.content}
                            createdAt={post.createdAt}
                            imageUrl={post.imageUrl}
                        />
                    ))
                ) : (
                    <Typography sx={{ color: '#ffffff', mt: 2 }}>
                        아직 작성한 게시글이 없습니다.
                    </Typography>
                )}
            </Box>

            {/* 네비게이션 */}
            <Navigation />
        </Box>
    );
};

export default Page;