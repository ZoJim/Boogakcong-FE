'use client';

import React from 'react';
import KakaoMap from './KakaoMap'; // KakaoMap 컴포넌트를 import
import { Box, Typography, Button } from '@mui/material';
import {blue} from "@mui/material/colors";
import { grey } from '@mui/material/colors';
interface CafeMapProps {
    name: string; // 카페 이름
    address: string; // 주소
    kakaoLink: string; // 카카오맵 링크
}

const CafeMap = ({ name, address, kakaoLink }: CafeMapProps) => {
    return (
        <Box
            sx={{
                width: '350px',
                height: '300px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: "inset 0px 4px 6px rgba(0, 0, 0, 0.2)",
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
                <KakaoMap initialLat={35.2321} initialLon={129.0846} level={3} mapId="cafeMap1" />
            </Box>

            {/* 흰색 하단 영역 */}
            <Box
                sx={{
                    width: '100%',
                    height: '100px', // 하단 영역의 높이를 100px로 고정
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start', // 왼쪽 정렬
                    justifyContent: 'center',
                    padding: '16px', // 패딩 추가
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'left', // 텍스트 왼쪽 정렬
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: grey[500],
                        fontSize: '12px',
                        marginBottom: '5px',
                        textAlign: 'left', // 텍스트 왼쪽 정렬
                    }}
                >
                    {address}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        alignSelf: 'flex-start', // 버튼을 왼쪽 정렬
                        backgroundColor: blue[200],
                        color: '#ffffff',
                        fontSize: '12px',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: blue[400],
                        },
                    }}
                    onClick={() => window.open(kakaoLink, '_blank')} // 카카오맵 링크로 이동
                >
                    카카오 장소보기
                </Button>
            </Box>
        </Box>
    );
};

export default CafeMap;