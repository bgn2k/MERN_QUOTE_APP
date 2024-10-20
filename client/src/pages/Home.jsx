import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
let navigate = useNavigate()
function handleLogin() {
    navigate('/login')
}
function handleRegister() {
    navigate('/register')
}
console.log("App Started")
  return (
    <>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={handleRegister}>Register</Button>
      </ButtonGroup>
    </>
  );
};
