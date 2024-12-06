'use client';

import React, { useState, useEffect } from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import Navigation from '@/components/Navigation';
import PostingList from '@/components/PostingList';
import ShortReview from '@/components/ShortReview';
import UserInfo from '@/components/UserInfo';
import { getUser } from '@/app/api/user';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/state/authAtom';
import {UserRole} from "@/types";

const Page = () => {
    const token = useAtomValue(accessTokenAtom); // Access Token 가져오기
    const [userInfo, setUserInfo] = useState<{
        name: string;
        role: UserRole;
        email: string;
    } | null>(null);
    const [error, setError] = useState<string | null>(null); // 에러 상태 관리

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
                        role={UserRole[userInfo.role] } // 열거형을 활용해 한글값 가져오기
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

                {/* ShortReview 컴포넌트 */}
                <ShortReview
                    cafeName="정지민카페"
                    content="공부하기 꽤 괜찮네요."
                    createdAt="2024-12-06T00:19:53.602633"
                />
                <ShortReview
                    cafeName="유일무이카페"
                    content="커피가 정말 맛있어요!"
                    createdAt="2024-12-05T13:42:15.602633"
                />
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

                {/* PostingList 컴포넌트 */}
                <PostingList
                    title="훌륭한 카페."
                    content="아늑한 분위기와 훌륭한 커피, 연구 아이디어 떠오르기 딱 좋은 곳입니다. 조용한 배경음악이 흐르는 공간에서 집중도가 높아지는 느낌이에요. 동료들과 함께 와도 좋을 만큼 편안하고 배려 깊은 서비스가 인상적입니다."
                    createdAt="2024-12-05"
                    imageUrl="/images/sanjinee.png"
                />
                <PostingList
                    title="친절한 직원"
                    content="직원분들이 정말 친절하고 상냥해서 기분 좋게 시간을 보냈어요."
                    createdAt="2024-12-06"
                    imageUrl="/images/sanjinee.png"
                />
            </Box>

            {/* 네비게이션 */}
            <Navigation />
        </Box>
    );
};

export default Page;