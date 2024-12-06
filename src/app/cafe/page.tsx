'use client';

import { keyframes } from '@emotion/react';
import { Box, CardMedia, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import Navigation from '@/components/Navigation';
import CafeMap from '@/components/CafeMap';
import CafeList from '@/components/CafeList';
import React from 'react';

const float = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
`;

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
                bgcolor: blue[200],
            }}
        >
            {/* 콘텐츠 영역 */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    width: '100%',
                    padding: '16px',
                    mt: 3,
                }}
            >
                {/* 지도 섹션 */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CardMedia
                            component="img"
                            src="/images/map.png"
                            alt="지도"
                            sx={{ width: 30, height: 30, mr: 1 }}
                        />
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                            지도
                        </Typography>
                    </Box>
                    <CafeMap name={'카페 1'} address={'주소 1'} kakaoLink={'http://place.map/1'} />
                </Box>

                {/* 카페 목록 섹션 */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CardMedia
                            component="img"
                            src="/images/list.png"
                            alt="카페 목록"
                            sx={{ width: 30, height: 30, mr: 1 }}
                        />
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                            카페 목록
                        </Typography>
                    </Box>

                    {/* 스크롤 가능한 리스트 */}
                    <Box

                        sx={{
                            height: '300px',
                            overflowX: 'hidden',
                            borderRadius: '8px',
                            padding: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            // justifyContent: 'center',
                        }}
                    >
                        <CafeList
                            cafes={[
                                { id: 1, name: '레드버튼 부산대점', distance: '3' },
                                { id: 2, name: '보노베리', distance: '5' },
                                { id: 3, name: '부산커피', distance: '7' },
                                { id: 4, name: '카페테제', distance: '4' },
                                { id: 5, name: '서빙고 본점', distance: '6' },
                            ]}
                        />
                    </Box>
                </Box>
            </Box>

            {/* 네비게이션 바 */}
            <Navigation />
        </Box>
    );
};

export default Page;