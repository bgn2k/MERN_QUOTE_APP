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

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function loginUser(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_BASEURL;
      const response = await axios.post(
        `${baseUrl}api/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = response.data;
      const token = data.token;

      if (token) {
        setUserName(data.name);
        navigate("/dashboard", {
          state: { userName: data.name, token: data.token },
        });
      } else {
        alert("Login Failed: Invalid Credentials");
        setEmail("");
        setPassword("");
        setLoading(false)
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: Please check your credentials and try again.");
      setEmail("");
      setPassword("");
      setLoading(false)
    }
  }

  function handleRegister() {
    navigate("/register");
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('https://source.unsplash.com/1600x900/?login')`,
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
            Hi! How you doing?
          </Typography>
          <Typography variant="body1" paragraph>
            Please log in to access your dashboard.
          </Typography>
          <Box
            component="form"
            onSubmit={loginUser}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginBottom: 2,
            }}
          >
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
              Login
            </Button>
          </Box>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleRegister}
            sx={{ padding: "10px 0", fontSize: "16px" }}
          >
            Register
          </Button>
        </Paper>
      )}
    </Box>
  );
};
