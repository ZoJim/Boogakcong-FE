import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import {blue} from '@mui/material/colors';
import {getCafeAll, requestCafeRegister} from '@/app/api/cafe'; // API 가져오기
import {toast} from 'react-toastify';

interface Cafe {
    id: number;
    name: string;
}

const CafeRegister = () => {
    const [cafes, setCafes] = useState<Cafe[]>([]); // 카페 목록 상태
    const [selectedCafeId, setSelectedCafeId] = useState<number | null>(null); // 선택한 카페 ID
    const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태

    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    // 카페 목록 불러오기
    useEffect(() => {
        const fetchCafes = async () => {
            setIsLoading(true);
            try {
                const response = await getCafeAll();
                if (Array.isArray(response)) {
                    setCafes(response);
                } else {
                    throw new Error('Failed to fetch cafes.');
                }
            } catch (error) {
                console.error('Error fetching cafes:', error);
                toast.error('카페 목록을 불러오는 데 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCafes();
    }, []);

    // 카페 선택 처리
    const handleCafeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedCafeId(event.target.value as number);
    };

    // 카페 등록 신청 처리
    const handleCafeRequest = () => {
        if (!selectedCafeId) {
            toast.error('카페를 선택해주세요.');
            return;
        }

        requestCafeRegister(selectedCafeId, token).then(r =>
            console.log(token)
        );

        console.log(`Selected Cafe ID: ${selectedCafeId}`);
        toast.success(`카페 ID ${selectedCafeId} 등록 신청 완료!`);
    };

    return (

        <Card
            sx={{
                width: 350,
                borderRadius: 2,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                padding: 2,
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{mb: 2}}>
                    카페 등록 신청
                </Typography>
                <FormControl fullWidth>
                    <InputLabel>카페를 선택하세요</InputLabel>
                    <Select
                        value={selectedCafeId || ''}
                        onChange={handleCafeSelect}
                        disabled={isLoading}
                    >
                        {cafes.map((cafe) => (
                            <MenuItem key={cafe.id} value={cafe.id}>
                                {cafe.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        bgcolor: blue[500],
                        color: 'white',
                        mt: 2,
                        borderRadius: 8,
                        '&:hover': {
                            bgcolor: blue[700],
                        },
                    }}
                    onClick={handleCafeRequest}
                    disabled={isLoading || !selectedCafeId}
                >
                    신청하기
                </Button>
            </CardContent>
        </Card>
    );
};

export default CafeRegister;