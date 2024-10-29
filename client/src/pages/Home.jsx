import { Button, ButtonGroup, Box, Typography, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  let navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleRegister() {
    navigate("/register");
  }

  function routeToAboutMe(){
    navigate('/about-me')
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('https://source.unsplash.com/random')`, // random image background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "40px",
          borderRadius: "15px",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency effect
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Welcome User
        </Typography>
        <Typography variant="body1" paragraph>
          Please log in or register to continue
        </Typography>
        <ButtonGroup variant="contained" size="large">
          <Button
            onClick={handleLogin}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#115293" },
            }}
          >
            Login
          </Button>
          <Button
            onClick={handleRegister}
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#388e3c" },
            }}
          >
            Register
          </Button>
          <Button
            onClick={handleRegister}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#115293" },
            }}
            onClick = {routeToAboutMe}
          >
            About Me
          </Button>
        </ButtonGroup>
      </Paper>
    </Box>
  );
};
