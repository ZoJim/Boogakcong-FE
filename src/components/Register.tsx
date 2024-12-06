'use client';

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import {signup} from "@/app/api/login"; // 페이지 전환을 위한 useRouter

interface RegisterProps {
    onNavigate: (page: string) => void; // 페이지 전환 함수
}

const Register = ({ onNavigate }: RegisterProps) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null); // 에러 상태 관리
    const router = useRouter(); // 페이지 전환

    const handleRegister = async () => {
        try {
            // API 호출
            await signup(email, password, name, phone);

            console.log("Signup successful");
            router.push("/login"); // 회원가입 성공 시 로그인 페이지로 이동
        } catch (err: any) {
            console.error("Signup failed:", err);
            setError(err.message || "회원가입에 실패했습니다.");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                bgcolor: "#ffffff",
                padding: 2.5,
            }}
        >
            <Box
                sx={{
                    width: 350,
                    textAlign: "center",
                    backgroundColor: "white",
                    padding: 4,
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: "bold",
                        fontSize: 36,
                        color: blue[500],
                        marginBottom: 3,
                    }}
                >
                    WELCOME!
                </Typography>

                {error && (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{ marginBottom: 2, textAlign: "center" }}
                    >
                        {error}
                    </Typography>
                )}

                <TextField
                    label="Name"
                    placeholder="홍길동"
                    variant="outlined"
                    value={name}
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                <TextField
                    label="Phone number"
                    placeholder="010-1234-5678"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                <TextField
                    label="Email address"
                    placeholder="gildong@gmail.com"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />

                <TextField
                    label="Password"
                    type="password"
                    placeholder="********"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginBottom: 3 }}
                />

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleRegister}
                    sx={{
                        bgcolor: blue[500],
                        color: "white",
                        height: 45,
                        fontWeight: "bold",
                        "&:hover": {
                            bgcolor: "#1976D2",
                        },
                        marginBottom: 2,
                    }}
                >
                    회원가입
                </Button>

                <Typography
                    variant="subtitle1"
                    style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                    onClick={() => onNavigate("/login")} // 로그인 페이지로 이동
                >
                    이미 회원이신가요?
                </Typography>
            </Box>
        </Box>
    );
};

export default Register;