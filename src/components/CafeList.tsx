'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import {blue, grey} from "@mui/material/colors";

interface Cafe {
    id: number;
    name: string;
    distance: string; // 거리 정보
}

interface CafeItemProps {
    cafe: Cafe;
}

const CafeItem = ({ cafe }: CafeItemProps) => {
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
                width: "340px",
                height: "50px",
                margin: '8px auto',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
            }}
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
                sx ={{
                    color: grey[800]
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

interface CafeListProps {
    cafes: Cafe[];
}

const CafeList = ({ cafes }: CafeListProps) => {
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
                <CafeItem key={cafe.id} cafe={cafe} />
            ))}
        </Box>
    );
};

export default CafeList;