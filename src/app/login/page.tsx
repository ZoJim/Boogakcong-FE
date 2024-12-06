'use client';

import React, { useState } from "react";
import Login from '@/components/Login';
import UserInfo from "@/components/UserInfo";
import { Box } from '@mui/material';
import { blue } from '@mui/material/colors';

const Page = () => {
  const [currentPage, setCurrentPage] = useState("login"); // 현재 페이지 상태

  const handleNavigate = (page: string) => {
    setCurrentPage(page); // 페이지 전환
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
      <Login onNavigate={handleNavigate} />
    </Box>
  );
};

export default Page;
