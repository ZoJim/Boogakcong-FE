'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { blue } from '@mui/material/colors';

const StartPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/cafe'); // 화면을 터치하면 /cafe로 이동
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        bgcolor: blue[200],
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer', // 클릭 가능하도록 커서 변경
      }}
      onClick={handleClick} // 전체 화면 클릭 이벤트
    >
      {/* 상단 반원 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '0%',
          transform: 'translateY(-50%)',
          width: 393,
          height: 342,
          borderBottomLeftRadius: '100%', // 왼쪽 반원 모양
          borderBottomRightRadius: '100%', // 오른쪽 반원 모양
          bgcolor: 'white',
          marginbottom: -3
        }}
      />

      {/* 세로 텍스트 */}
      <Typography
        variant="h1"
        sx={{
            position: 'absolute',
            top: 180, // Y 좌표
            left: 150, // X 좌표
            fontSize: 84,
            fontWeight: 'bold',
            color: 'white',
            writingMode: 'vertical-rl', // 세로로 텍스트 배치
            textAlign: 'center',
            letterSpacing: '0.6em', // 자간 조절
        }}
      >
        부각콩
      </Typography>

    {/* 하단 반원 */}
    <Box
        sx={{
            position: 'absolute',
            bottom: 0,
            left: '0%',
            transform: 'translateY(50%)',
            width: 393,
            height: 342,
            borderTopLeftRadius: '100%',
            borderTopRightRadius: '100%',
            bgcolor: 'white',
        }}
        />
    </Box>
  );
};

export default StartPage;
