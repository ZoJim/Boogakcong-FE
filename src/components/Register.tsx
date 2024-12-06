import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const Register = () => {
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
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: 400,
          textAlign: "center",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#2196F3",
            marginBottom: 3,
          }}
        >
          WELCOME!
        </Typography>

        <TextField
          label="Name"
          placeholder="홍길동"
          variant="outlined"
          fullWidth
          value={name}
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
            bgcolor: "#2196F3",
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
