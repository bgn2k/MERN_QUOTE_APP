import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./User";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  async function loginUser(e) {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/api/login",
      {
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
    const token = response.data.token;
    if (token) {
      console.log("User Logged Successfully");
      setUserName(data.name);
      navigate("/user", { state: { userName: data.name } });
    } else {
      console.log("Unauthorized User");
      alert("Login Failed: Invalid Credentials");
      setEmail("");
      setPassword("");
    }
    console.log(data);
  }
  function handleRegister() {
    const navigate = new useNavigate();
    navigate("/register");
  }

  return (
    <>
      <>
        <Typography variant="h1" component="h2" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={loginUser}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
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
          <Button value="login" variant="contained" type="submit" fullWidth>
            Login
          </Button>
        </Box>
        <br />
        <Button variant="outlined" type="submit" fullWidth>
          <Link to="/register">Register</Link>
        </Button>
      </>
    </>
  );
};
