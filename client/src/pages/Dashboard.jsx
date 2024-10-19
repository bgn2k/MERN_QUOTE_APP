import { useEffect } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
export const Dashboard = () => {
  const location = useLocation();
  const { userName } = location.state || {};
  const navigate = useNavigate();
  function handleSignOut() {
    navigate("/login");
  }
  useEffect(() => {
    if(!userName){
      navigate('/login')
    }
  },[])
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Hello {userName}!
        </Typography>
        <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
      </Toolbar>
    </AppBar>
  </Box>
  );
};
