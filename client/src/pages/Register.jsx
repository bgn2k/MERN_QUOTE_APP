import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = new useNavigate();
  async function registerUser(e) {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/api/register",
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    navigate('/login')
    console.log(data);
  }
  function handleLogin() {
    navigate("/login");
  }
  return (
    <>
      <Typography variant="h1" component="h2" gutterBottom>
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={registerUser}
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
      >
        <TextField
          label="Name"
          variant="outlined"
          color="secondary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          color="secondary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          color="secondary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button value="register" variant="contained" type="submit" fullWidth>
          Register
        </Button>
        <Button
        variant="outlined"
        type="submit"
        fullWidth
        onClick={() => handleLogin()}
      >
        Login
      </Button>
      </Box>
    </>
  );
};
