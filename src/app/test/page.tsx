'use client';

import React from 'react';
import {Box} from '@mui/material';
import {blue} from "@mui/material/colors";
import Login from "@/components/Login";

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
            <Login>

            </Login>
        </Box>
    );
};

export default Page;
