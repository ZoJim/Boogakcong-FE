'use client';

import {keyframes} from '@emotion/react';
import {Box} from '@mui/material';
import Posting from "@/components/Posting";


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
        {/*    여기 넣어서 테스트 해보면 돼!! */}
            <Posting/>
        </Box>
    );
}

export default Page;
