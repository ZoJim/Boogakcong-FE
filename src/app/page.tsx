'use client';

import { keyframes } from '@emotion/react';
import { Box, CardMedia, Typography } from '@mui/material';


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
                bgcolor: 'background.default',
            }}
        >
            <CardMedia
                component="img"
                image="/images/sanjinee.png"
                sx={{
                    width: 200,
                    height: 200,
                    animation: `${float} 2s infinite`,
                }}
            />
            <Typography variant="h1" sx={{ mt: 2 }}>
                Hello, Sanjinee!
            </Typography>
        </Box>
    );
}

export default Page;