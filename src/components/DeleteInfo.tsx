import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface DeleteInfoProps {
    cafeID: number;
    cafeName: string;
    deleteReason: string;
    requestStatus: string;
    onApprove: (requestId: number) => void;  // Add onApprove callback
    requestId: number;
}

enum DeleteReason {
    CAFE_CLOSED = "더이상 운영하지 않음",
    CAFE_UNMAINTAINABLE = "유지보수 어려움",
    ETC = "기타"
}

// requestStatus values are now strings
const RequestStatus = {
    REQUESTED: "REQUESTED",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED"
};


const DeleteInfo = ({ cafeID, cafeName, deleteReason, onApprove, requestStatus, requestId }: DeleteInfoProps) => {
    console.log(deleteReason);
    console.log('Request Status:', requestStatus);

    const handleApprove = () => {
        onApprove(requestId);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                p: 1,
                bgcolor: 'white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                justifyContent: 'space-between',
            }}
        >
            <Box>
                <Typography variant="body2" sx={{ mr: 2 }}>
                    CAFE ID: {cafeID}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 2 }}>
                    {cafeName}
                </Typography>
                <Typography variant="body2">
                    {DeleteReason[deleteReason as keyof typeof DeleteReason]}
                </Typography>
            </Box>

            <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={handleApprove}
                disabled={requestStatus !== RequestStatus.REQUESTED}
                sx={{
                    ml: 2,
                    textTransform: 'none',
                    borderColor: 'green',
                    '&:hover': {
                        bgcolor: 'green',
                        color: 'white',
                    },
                }}
            >
                {requestStatus === RequestStatus.REQUESTED ? '삭제 승인' : '처리 완료'}
            </Button>
        </Box>
    );
};

export default DeleteInfo;