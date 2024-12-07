import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import {blue} from '@mui/material/colors';
import {approveCafeRegisterRequest} from "@/app/api/cafe";

interface CafeRegisterProps {
    requestId: number; // 요청 ID
    onApprove?: () => void; // 승인 버튼 클릭 핸들러 (선택적)
    cafeId: number; // 카페 ID
    ownerId: number; // 사용자 ID 추가
}

const CafeRegister = ({requestId, onApprove, cafeId, ownerId}: CafeRegisterProps) => {
    const token = localStorage.getItem("accessToken") || "";

    const handleApprove = () => {
        approveCafeRegisterRequest(token, requestId);
        window.location.reload();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '350px',
                borderRadius: 2,
                p: 1,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                mb: 1,
            }}
        >
            <Typography variant="body2" sx={{mr: 2}}>
                요청 ID: {requestId}
            </Typography>
            <Typography variant="body2" sx={{mr: 2}}>
                카페 ID: {cafeId} {/* 카페 ID 출력 */}
            </Typography>
            <Typography variant="body2" sx={{mr: 2}}>
                사용자 ID: {ownerId} {/* 사용자 ID 출력 */}
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