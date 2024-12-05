'use client';

import {keyframes} from '@emotion/react';
import {Box} from '@mui/material';
import {blue} from "@mui/material/colors";
import Navigation from "@/components/Navigation";

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
                bgcolor: blue[200]
            }}
        >
            <Navigation />
        </Box>
    );
}

export default Page;
