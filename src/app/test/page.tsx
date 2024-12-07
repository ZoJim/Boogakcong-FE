'use client';

import React from 'react';
import {Box} from '@mui/material';
import {blue} from "@mui/material/colors";
import PostingEditor from "@/components/PostingEditor";
import CafeRegister from "@/components/CafeRegister";
import CafeModify from "@/components/CafeModify";
import CafeRegisterRequest from "@/components/CafeRegisterRequest";

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
            <CafeRegisterRequest
            ></CafeRegisterRequest>
        </Box>
    );
};

export default Page;
