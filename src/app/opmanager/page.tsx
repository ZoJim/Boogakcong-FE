'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { PieChart, BarChart, LineChart } from '@mui/x-charts';
import {analyzeUser} from "@/app/api/user";

const Page = () => {
    const token = localStorage.getItem('accessToken') || null;

    const [userStats, setUserStats] = useState<any>({
        normalUserCount: 0,
        cafeOwnerCount: 0,
        communityManagerCount: 0,
        totalMemberCount: 0,
    });

    // API 호출하여 회원 통계 데이터를 받아오는 함수
    useEffect(() => {
        if (token) {
            analyzeUser(token).then(response => {
                setUserStats(response);
            }).catch(error => {
                console.error('회원 분석 데이터를 불러오는 데 실패했습니다:', error);
            });
        }
    }, [token]);

    const pData = [30, 50, 70, 90, 110, 130, 140]; // 신규 카페 & 게시글
    const uData = [20, 40, 60, 80, 90, 100, 120]; // 신규 카페 & 후기글
    const xLabels = ['월', '화', '수', '목', '금' ,'토', '일']; // X축 레이블

    // PieChart 데이터 업데이트
    const pieData = [
        { id: 0, value: userStats.normalUserCount, color: blue[500], label: '일반 유저' },
        { id: 1, value: userStats.cafeOwnerCount, color: blue[700], label: '카페 소유자' },
        { id: 2, value: userStats.communityManagerCount, color: blue[900], label: '커뮤니티 매니저' },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                bgcolor: blue[200],
                p: 3,
            }}
        >
            {/* 제목 */}
            <Typography
                variant="h1"
                sx={{
                    color: 'white',
                    fontSize: 32,
                    mb: 3,
                }}
            >
                운영 관리자 페이지
            </Typography>

            {/* 컨텐츠 섹션 */}
            <Box>
                {/* 회원 등급 관리 */}
                <Typography variant="h3" sx={{ fontSize: 24, fontWeight: 'bold', mb: 1, color: 'white' }}>
                    회원 등급 관리
                </Typography>
                <Box sx={{ flex: 1, p: 0, mb: 2 }}>
                    {/* 텍스트필드와 검색 버튼 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TextField
                            placeholder="회원 검색"
                            variant="outlined"
                            size="small"
                            sx={{
                                width: 280,
                                height: 34,
                                marginLeft: 1,
                                bgcolor: 'white',
                                borderRadius: 1,
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <IconButton
                            sx={{
                                marginLeft: 1,
                                bgcolor: 'white',
                                padding: 1,
                                borderRadius: '50%',
                                '&:hover': { bgcolor: grey[300] },
                            }}
                        >
                            <img
                                src="/images/search.png"
                                alt="검색"
                                style={{ width: 20, height: 20 }}
                            />
                        </IconButton>
                    </Box>

                    {/* 사용자 비율 차트 */}
                    <Typography variant="h3" sx={{ fontSize: 24, fontWeight: 'bold', mt: 3, mb: 1, color: 'white' }}>
                        사용자 비율
                    </Typography>
                    <PieChart
                        series={[{ data: pieData }]}
                        width={350}
                        height={180}
                    />
                </Box>

                {/* 카페 트래픽 차트 */}
                <Typography variant="h3" sx={{ fontSize: 24, fontWeight: 'bold', mt: 3, mb: 1, color: 'white' }}>
                    카페
                </Typography>
                <Typography variant="h4" sx={{ fontSize: 20, fontWeight: 'bold', mb: 1, color: 'white' }}>
                    트래픽
                </Typography>
                <BarChart
                    width={350}
                    height={300}
                    series={[
                        { data: pData, label: '신규 카페', color: '#0D47A1', id: 'pvId', stack: 'total' },
                        { data: uData, label: '기존 카페', color: '#1E88E5', id: 'uvId', stack: 'total' },
                    ]}
                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                />

                {/* 카페 매니지먼트 */}
                <Typography variant="h4" sx={{ fontSize: 20, fontWeight: 'bold', mt: 2, mb: 1, color: 'white' }}>
                    매니지먼트
                </Typography>

                <Typography variant="h4" sx={{ fontSize: 16, mt: 2, mb: 1, color: 'white' }}>
                    부산대 인근 신규 카페 일괄 업데이트
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        marginLeft: 1.2,
                        bgcolor: blue[500], // 버튼 배경색
                        color: 'white', // 버튼 텍스트 색상
                        fontSize: 14,
                        '&:hover': {
                            bgcolor: blue[700], // 호버 상태 배경색
                        },
                    }}
                >
                    업데이트
                </Button>

                {/* 포스팅 트래픽 차트 */}
                <Typography variant="h3" sx={{ fontSize: 24, fontWeight: 'bold', mt: 5, mb: 1, color: 'white' }}>
                    포스팅
                </Typography>
                <Typography variant="h4" sx={{ fontSize: 20, fontWeight: 'bold', mb: 1, color: 'white' }}>
                    트래픽
                </Typography>

                <LineChart
                    width={350}
                    height={300}
                    sx={{ mb: 3 }}
                    series={[
                        { data: pData, color: '#0D47A1', label: '게시글' },
                        { data: uData, color: '#1E88E5', label: '후기글' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
            </Box>
        </Box>
    );
};

export default Page;