'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface Cafe {
    id: number;
    name: string;
    distance: string;
    latitude: number;
    longitude: number;
    address: string;
    kakaoLink: string;
}

interface CafeListProps {
    cafes: Cafe[];
    onCafeClick: (cafe: Cafe) => void;
}

const CafeItem = ({ cafe, onCafeClick }: { cafe: Cafe; onCafeClick: (cafe: Cafe) => void }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '8px',
                boxShadow: "inset 0px 4px 6px rgba(0, 0, 0, 0.2)",
                backgroundColor: '#ffffff',
                width: '100%',
                height: '50px',
                margin: '8px auto',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    backgroundColor: grey[200],
                },
            }}
            onClick={() => onCafeClick(cafe)}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    color: '#333',
                }}
            >
                {cafe.name}
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    color: grey[800],
                }}
            >
                정문에서 도보{' '}
                <Box
                    component="span"
                    sx={{
                        fontWeight: 'bold', // 굵게 설정
                        color: 'inherit', // 동일한 색상 유지
                    }}
                >
                    {cafe.distance}분
                </Box>
            </Typography>
        </Box>
    );
};

const CafeList = ({ cafes, onCafeClick }: CafeListProps) => {
    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.1,
                padding: '8px',
            }}
        >
            {cafes.map((cafe) => (
                <CafeItem key={cafe.id} cafe={cafe} onCafeClick={onCafeClick} />
            ))}
        </Box>
    );
};

export default CafeList;