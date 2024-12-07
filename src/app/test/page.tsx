'use client';

import React from 'react';
import {Box} from '@mui/material';
import {blue} from "@mui/material/colors";
import PostingEditor from "@/components/PostingEditor";

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
            <PostingEditor id={0} title="" content="" userId={0} postType=c imageUrl="" createdAt="" />
        </Box>
    );
};

export default Page;
