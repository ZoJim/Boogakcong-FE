'use client';

import React, { useState } from "react";
import Register from "@/components/Register";
import UserInfo from "@/components/UserInfo";
import { Box } from '@mui/material';
import { blue } from '@mui/material/colors';

const Page = () => {
  const handleNavigate = (page: string) => {
    console.log(`Navigating to ${page}`);
    // 페이지 전환 로직 추가 가능
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
        bgcolor: blue[200],
        overflow: 'hidden',
      }}
    >
      <Register onNavigate={handleNavigate} />
    </Box>
  );
};

export default Page;
