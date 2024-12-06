'use client';

import { keyframes } from '@emotion/react';
import { Box, CardMedia, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import Navigation from '@/components/Navigation';
import CafeMap from '@/components/CafeMap';
import CafeList from '@/components/CafeList';
import React, { useState } from 'react';

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
    const [selectedCafe, setSelectedCafe] = useState({
        name: '레드버튼 부산대점',
        address: '부산 금정구 금정로 75',
        kakaoLink: 'http://place.map.kakao.com/445393846',
        latitude: 35.2314175247574,
        longitude: 129.086345000906,
    });

    const handleCafeClick = (cafe: {
        name: string;
        address: string;
        kakaoLink: string;
        latitude: number;
        longitude: number;
    }) => {
        setSelectedCafe(cafe);
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
                    <CafeMap
                        name={selectedCafe.name}
                        address={selectedCafe.address}
                        kakaoLink={selectedCafe.kakaoLink}
                        latitude={selectedCafe.latitude}
                        longitude={selectedCafe.longitude}
                    />
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
                            overflowY: 'auto',
                            borderRadius: '8px',
                            padding: '8px',
                        }}
                    >
                        <CafeList
                            cafes={[
                                {
                                    id: 1,
                                    name: '레드버튼 부산대점',
                                    distance: '3',
                                    latitude: 35.2314175247574,
                                    longitude: 129.086345000906,
                                    address: '부산 금정구 금정로 75',
                                    kakaoLink: 'http://place.map.kakao.com/445393846',
                                },
                                {
                                    id: 2,
                                    name: '보노베리',
                                    distance: '5',
                                    latitude: 35.23152,
                                    longitude: 129.08512,
                                    address: '부산 금정구 장전온천천로 67-1',
                                    kakaoLink: 'http://place.map.kakao.com/54054644',
                                },
                                {
                                    id: 3,
                                    name: '카페 노티드',
                                    distance: '7',
                                    latitude: 35.23152,
                                    longitude: 129.08512,
                                    address: '부산 금정구 장전온천천로 67-1',
                                    kakaoLink: 'http://place.map.kakao.com/540'
                                },
                                {
                                    id: 4,
                                    name: '카페 노티드',
                                    distance: '7',
                                    latitude: 35.23152,
                                    longitude: 129.08512,
                                    address: '부산 금정구 장전온천천로 67-1',
                                    kakaoLink: 'http://place.map.kakao.com/540'
                                },{
                                    id: 5,
                                    name: '카페 노티드',
                                    distance: '7',
                                    latitude: 35.23152,
                                    longitude: 129.08512,
                                    address: '부산 금정구 장전온천천로 67-1',
                                    kakaoLink: 'http://place.map.kakao.com/540'
                                }

                            ]}
                            onCafeClick={handleCafeClick}
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