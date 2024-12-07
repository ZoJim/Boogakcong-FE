'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation'; // Next.js의 useRouter import
import { login } from '@/app/api/login';
import {accessTokenAtom, refreshTokenAtom} from "@/state/authAtom"; // 로그인 API 요청 함수

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setAccessToken = useSetAtom(accessTokenAtom);
    const setRefreshToken = useSetAtom(refreshTokenAtom);
    const router = useRouter(); // useRouter 사용

    const handleLogin = async () => {
        try {
            console.log('Attempting login with email:', email);
            const userData = await login(email, password); // API call to login
            console.log('Login successful:', userData);

            // Check if accessToken and refreshToken exist
            if (!userData.accessToken || !userData.refreshToken) {
                throw new Error('Tokens are missing. Please log in again.');
            }

            // Save tokens
            setAccessToken(userData.accessToken);
            setRefreshToken(userData.refreshToken);

            // Navigate to main page
            router.push('/cafe');
        } catch (error) {
            console.error('Login failed:', error);

            // Check for missing tokens or other errors
            if (error.message === 'Tokens are missing. Please log in again.') {
                alert('Login failed. Please try again.');
            } else if (error.status === 404) {
                alert('Invalid email or password. Please try again.');
            } else {
                alert('Something went wrong. Please try again later.');
            }

            // Clear any stored tokens
            setAccessToken(null);
            setRefreshToken(null);

            // Optionally redirect to login page
            router.push('/login');
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