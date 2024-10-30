import { useEffect, useState } from "react";
import { Button, CircularProgress, Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Quote from "./Quote";
import quotesFile from "../../quotes.json";
import Footer from "./Footer";

export const Dashboard = () => {
  const [quoteArr, setQuoteArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const location = useLocation();
  const { userName, token } = location.state || {};
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAboutMeClick = () => {
    navigate('/dashboard/about-me');
    handleClose();
  };

  function handleSignOut() {
    navigate("/login");
  }

  useEffect(() => {
    if (!userName) {
      navigate("/login");
    } else {
      populateQuote(token);
    }
  }, []);

  async function populateQuote(token) {
    try {
      const baseUrl = import.meta.env.VITE_BASEURL;
      const headers = { "access-token": token };
      const response = await axios.get(`${baseUrl}api/quote`, {
        headers: headers,
      });
      const data = response.data;
      if (!data) {
        setQuoteArr(quotesFile);
      } else {
        setQuoteArr(data.data);
      }
    } catch (error) {
      setError("Failed to fetch quotes. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAboutMeClick}>About Me</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello, {userName}!
          </Typography>
          <Button variant="inherit" sx={{ backgroundColor: 'yellow', color: 'black' }} onClick={handleAboutMeClick}>
            About Me!
          </Button>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, mt: 8, p: 3 }}>
        {/* Loading state */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <Quote quoteArr={quoteArr} />
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;
