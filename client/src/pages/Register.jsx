import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    try {
      setLoading(true)
      const baseUrl = import.meta.env.VITE_BASEURL;
      const response = await axios.post(
        `${baseUrl}api/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = response.data;
      if (data.status === "ok") {
        const otpResponse = await axios.post(`${baseUrl}api/verify-email`, {
          email: email,
        });
        if (otpResponse?.data?.status === "Success") {
          navigate("/verify-email", { state: otpResponse?.data });
        }
      } else {
        alert(`Error: ${data.error}`);
        setEmail("");
        setName("");
        setPassword("");
        navigate("/register");
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('https://source.unsplash.com/1600x900/?register')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper
          elevation={6}
          sx={{
            padding: "40px",
            borderRadius: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            Create Your Account
          </Typography>
          <Typography variant="body1" paragraph>
            Register now to get started!
          </Typography>
          <Box
            component="form"
            onSubmit={registerUser}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginBottom: 2,
            }}
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ padding: "10px 0", fontSize: "16px" }}
            >
              Register
            </Button>
          </Box>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleLogin}
            sx={{ padding: "10px 0", fontSize: "16px" }}
          >
            Login
          </Button>
        </Paper>
      )}
    </Box>
  );
};
