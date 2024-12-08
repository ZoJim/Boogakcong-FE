import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    FormControlLabel,
    RadioGroup,
    Radio,
    Button,
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import {deleteCafe} from "@/app/api/cafe";
import {toast, ToastContainer} from "react-toastify";

const DeleteRequest = () => {
    const token = localStorage.getItem("accessToken") || "";
    const [selectedReason, setSelectedReason] = useState(0); // 0, 1, 2로 초기화

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedReason(Number(value)); // 선택된 값을 숫자로 처리
    };

    const handleSubmit = async () => {
        try {
            // 선택된 이유와 토큰을 deleteCafe 함수에 전달
            await deleteCafe(token, selectedReason);

            console.log('카페 삭제 요청이 제출되었습니다.');
            toast.success('카페 삭제 요청이 제출되었습니다. (처리까지 약 2일)');
        } catch (error) {
            console.error('카페 삭제 요청 실패:', error);
            toast.error('카페 삭제 요청에 실패했습니다.');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, padding: 2, width: 350 }}>
            <Card
                sx={{
                    p: 2,
                    borderRadius: 8,
                    width: '100%', // Card의 너비를 100%로 설정
                    boxShadow: 'none', // 카드 그림자 없애기
                }}
            >
                <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, width: '100%' }}>
                    <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 'bold', mb: 1 }}>
                        카페 삭제 요청
                    </Typography>
                    <Typography variant="body2" sx={{ color: grey[700], mb: 2 }}>
                        삭제 요청 사유
                    </Typography>
                    <RadioGroup value={selectedReason.toString()} onChange={handleChange}>
                        <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="더이상 카페를 운영하지 않음"
                            sx={{ width: '100%' }}
                        />
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="부각콩 모임 유지가 어려움"
                            sx={{ width: '100%' }}
                        />
                        <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="기타"
                            sx={{ width: '100%' }}
                        />
                    </RadioGroup>
                </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 8,
                        bgcolor: blue[500],
                        color: "white",
                        boxShadow: 'none', // 버튼의 그림자 없애기
                        '&:hover': {
                            bgcolor: blue[700],
                        },
                    }}
                    onClick={handleSubmit}
                >
                    완료
                </Button>
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default DeleteRequest;