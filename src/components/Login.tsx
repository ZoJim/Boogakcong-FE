'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation'; // Next.js의 useRouter import
import { accessTokenAtom, refreshTokenAtom } from '@/state/authAtom'; // Jotai Atom
import { login } from '@/app/api/login'; // 로그인 API 요청 함수

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setAccessToken = useSetAtom(accessTokenAtom);
    const setRefreshToken = useSetAtom(refreshTokenAtom);
    const router = useRouter(); // useRouter 사용

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            setAccessToken(response.accessToken); // Access Token 저장
            setRefreshToken(response.refreshToken); // Refresh Token 저장
            console.log('Login successful');
            console.log('Access Token:', response.accessToken);
            console.log('Refresh Token:', response.refreshToken);
            router.push('/cafe'); // 로그인 성공 시 /cafe로 이동
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Card
                sx={{
                    width: 496,
                    height: 545,
                    borderRadius: '50%', // 원 모양
                    textAlign: 'center',
                    bgcolor: 'white',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                }}
            >
                {/* Title */}
                <Typography
                    variant="h1"
                    style={{ fontSize: '36px' }}
                    sx={{
                        fontWeight: 'bold',
                        color: blue[500],
                    }}
                >
                    JOIN
                </Typography>

                {/* Email Field */}
                <TextField
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="gildong@gmail.com"
                    sx={{
                        width: '75%',
                        borderRadius: 3,
                        marginBottom: 2,
                        marginTop: 3,
                    }}
                />

                {/* Password Field */}
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    sx={{
                        width: '75%',
                        borderRadius: 3,
                        marginBottom: 4,
                    }}
                />

                {/* Login Button */}
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleLogin}
                    sx={{
                        bgcolor: blue[500],
                        color: 'white',
                        width: '75%',
                        height: 45,
                        fontWeight: 'bold',
                        '&:hover': {
                            bgcolor: blue[300],
                        },
                        mb: 2,
                    }}
                >
                    로그인
                </Button>

                {/* Register Link */}
                <Typography
                    variant="subtitle1"
                    style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                    onClick={() => router.push('/register')} // 회원가입 페이지로 이동
                >
                    회원이 아니신가요?
                </Typography>
            </Card>
        </Box>
    );
};

export default Login;