import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { blue } from '@mui/material/colors';
import CafeRegisterRequest from "@/components/CafeRegisterRequest";

interface CafeRegisterProps {
  requestId: string; // 요청 ID
  onApprove?: () => void; // 승인 버튼 클릭 핸들러 (선택적)
}

const CafeRegister = ({ requestId, onApprove }:CafeRegisterProps) => {
  const handleApprove = () => {
    if (onApprove) {
      onApprove();
    } else {
      console.log(`Request ${requestId} approved!`);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
          width:'350px',
        borderRadius: 2,
        p: 1,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        mb: 1,
      }}
    >
      <Typography variant="body2" sx={{ mr: 2 }}>
        요청 ID: {requestId}
      </Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: blue[500],
          color: 'white',
          fontSize: 12,
          padding: '4px 16px',
          '&:hover': {
            bgcolor: blue[700],
          },
        }}
        onClick={handleApprove}
      >
        승인
      </Button>
    </Box>
  );
};

export default CafeRegister;
