'use client';

import React from 'react';
import KakaoMap from './KakaoMap'; // 수정된 KakaoMap 컴포넌트
import { Box, Typography } from '@mui/material';

const CafeMap = () => {
    return (
        <Box
            sx={{
                width: '350px',
                height: '300px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* 지도 영역 */}
            <Box
                sx={{
                    width: '100%',
                    height: '200px', // 지도 영역의 높이를 200px로 제한
                }}
            >
                {/* 고유 mapId 전달 */}
                <KakaoMap initialLat={35.2321} initialLon={129.0846} level={3} mapId="cafeMap1" />
            </Box>

            {/* 흰색 하단 영역 */}
            <Box
                sx={{
                    width: '100%',
                    height: '100px', // 하단 영역의 높이를 100px로 고정
                    backgroundColor: '#ffffff',
                    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: '#333333',
                        textAlign: 'center',
                        fontSize: '14px',
                    }}
                >
                    여기에 원하는 텍스트 또는 추가 UI 요소를 배치하세요.
                </Typography>
            </Box>
        </Box>
    );
};

export default CafeMap;