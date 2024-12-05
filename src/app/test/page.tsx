'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import Posting from '@/components/Posting';
import PostView from '@/components/PostView';
import {blue} from "@mui/material/colors";

const Page = () => {
    const [submittedData, setSubmittedData] = useState({
        title: '',
        content: '',
        image: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (title: string, content: string, image: string) => {
        setSubmittedData({ title, content, image });
        setIsSubmitted(true); // PostView 표시
    };

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
            {!isSubmitted ? (
                <Posting onSubmit={handleSubmit} />
            ) : (
                <PostView
                    title={submittedData.title}
                    content={submittedData.content}
                    image={submittedData.image}
                />
            )}
        </Box>
    );
};

export default Page;
