import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

interface UserInfoProps {
    name: string;
    role: string;
    email: string;
    onEditCafe?: () => void; // 내 카페 수정 버튼 클릭 핸들러
    onRegisterCafe?: () => void; // 카페 등록 버튼 클릭 핸들러
    onDeleteCafe?: () => void; // 카페 삭제 요청 클릭 핸들러
}

const UserInfo: React.FC<UserInfoProps> = ({ name, role, email, onEditCafe, onRegisterCafe, onDeleteCafe }) => {
    return (
        <Paper
            sx={{
                width: 350,
                height: 90,
                borderRadius: '12px',
                p: 2,
                boxShadow: "inset 0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
        >
            {/* User Info */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center', // 수직 중앙 정렬
                    justifyContent: 'space-between', // 간격 조정
                    mb: 1,
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: grey[900] }}>
                    {name} <span style={{ fontSize: 12, color: grey[700] }}>{role}</span>
                </Typography>
                {onEditCafe && (
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            ml: 2,
                            borderRadius: 10,
                            height: 25,
                            fontSize: '0.8rem',
                            color: 'white',
                            bgcolor: blue[300],
                            '&:hover': { bgcolor: blue[500] },
                        }}
                        onClick={role === '카페 소유자' ? onEditCafe : onRegisterCafe}
                    >
                        {role === '카페 소유자' ? '내 카페 수정' : '카페 등록'}
                    </Button>
                )}
            </Box>

            <Typography variant="body1" sx={{ mt: 1, color: grey[800] }}>
                [메일] {email}
            </Typography>

            {/* Footer */}
            <Box sx={{ mt: 0 }}>
                {onDeleteCafe && (
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'right',
                            color: 'black',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                        onClick={onDeleteCafe}
                    >
                        카페 삭제 요청
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default UserInfo;
