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
import axios from "axios";
import { useState } from "react";
import Quote from "./Quote";
import quotesFile from '../../quotes.json'
export const Dashboard = () => {
  const [quoteArr, setQuoteArr] = useState([])
  const location = useLocation();
  const { userName } = location.state || {};
  const {token} = location.state || {}
  const navigate = useNavigate();
  function handleSignOut() {
    navigate("/login");
  }
  useEffect(() => {
    if(!userName){
      navigate('/login')
    }else{
        populateQuote(token)
    }
  },[])
async function populateQuote(token) {
console.log("TOKEN IN DASHBOARD: ", token)
try {
    const headers = { 'access-token': token };
    const response = await axios.get('http://localhost:4000/api/quote', {
      headers: headers
    });
    const data = response.data;
    if(!data){
      setQuoteArr(quotesFile)
    }else{
      console.log(data)
      setQuoteArr(data.data)
    }
} catch (error) {
  console.log("Error at populateQuote() ", error)
}
}
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed">
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
    <div>
    <Quote quoteArr = {quoteArr}/>
    </div>
  </Box>
  );
};
