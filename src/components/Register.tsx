import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

interface RegisterProps {
  onNavigate: (page: string) => void; // 페이지 전환 함수
}

const Register = ({ onNavigate }: RegisterProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Email:", email);
    console.log("Password:", password);
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
          onClick={() => onNavigate("/login")} // 페이지 전환
          sx={{
            bgcolor: blue[500],
            color: "white",
            height: 45,
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#1976D2",
            },
          }}
        >
          회원가입
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
