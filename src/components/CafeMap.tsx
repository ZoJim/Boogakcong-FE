'use client';

import React from 'react';
import KakaoMap from './KakaoMap';
import { Box, Typography, Button } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

interface CafeMapProps {
    name: string; // 카페 이름
    address: string; // 주소
    kakaoLink: string; // 카카오맵 링크
    latitude: number; // 카페 위도
    longitude: number; // 카페 경도
    onPlaceButtonClick: () => void; // New prop for button click handler
}

const CafeMap = ({ name, address, kakaoLink, latitude, longitude, onPlaceButtonClick }: CafeMapProps) => {
    return (
        <Box
            sx={{
                width: '350px',
                height: '300px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: 'inset 0px 4px 6px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* 지도 영역 */}
            <Box
                sx={{
                    width: '100%',
                    height: '200px',
                }}
            >
                <KakaoMap
                    initialLat={35.2321}
                    initialLon={129.0846}
                    level={3}
                    mapId="cafeMap1"
                    latitude={latitude}
                    longitude={longitude}
                    markerImage="/images/sanjinee.png" // 마커 이미지 경로
                />
            </Box>

            {/* 하단 정보 영역 */}
            <Box
                sx={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '16px',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: grey[500],
                        fontSize: '12px',
                        marginBottom: '5px',
                        textAlign: 'left',
                    }}
                >
                    {address}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        alignSelf: 'flex-start',
                        backgroundColor: blue[200],
                        color: '#ffffff',
                        fontSize: '12px',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: blue[400],
                        },
                    }}
                    onClick={onPlaceButtonClick}
                >
                    장소보기
                </Button>
            </Box>
        </Box>
    );
};

export default CafeMap;