import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, Card } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh"
      }}
    >
      <Card
        sx={{
          width: 496, // 원의 너비
          height: 545, // 원의 높이
          borderRadius: "50%", // 원 모양
          textAlign: "center",
          bgcolor: "white",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column", // 수직 배치
          justifyContent: "center", // 수직 중앙 정렬
          alignItems: "center", // 수평 중앙 정렬
          padding: 3,
        }}
      >
        {/* JOIN Title */}
        <Typography
          variant="h3"
          style={{ fontSize: "32px" }} // 인라인 스타일로 폰트 크기 설정
          sx={{
            fontWeight: "bold",
            color: "#2196F3"
          }}
        >
          JOIN
        </Typography>

        {/* Email Field */}
        <TextField
            label="Email address"
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
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
                width: '75%',
                borderRadius: 3,
                marginBottom: 2,
            }}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            bgcolor: "#2196F3",
            color: "white",
            width: "75%",
            height: 45,
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#1976D2",
            },
            mb: 2,
          }}
        >
          로그인
        </Button>

        {/* Register Link */}
        <Typography variant="body2"
            style={{
                textDecoration: "underline",
            }}
          >
          <Link href="/register" underline="always" sx={{ color: "black" }}>
            회원이 아니신가요?
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;
