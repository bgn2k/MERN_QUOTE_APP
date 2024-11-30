import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Quote from "./Quote";
import quotesFile from "../../quotes.json";
import Footer from "./Footer";
import axios from 'axios'
export const Dashboard = () => {
  const [quoteArr, setQuoteArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);  // Boolean conversion for open state

  const location = useLocation();
  const { userName, token } = location.state || {};
  const navigate = useNavigate();

  function handleSignOut() {
    setAnchorEl(null); // Close the menu when sign-out happens
    navigate("/login");
  }

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget); // Open the menu by setting the anchor element
  }

  function handleCloseMenu() {
    setAnchorEl(null); // Close the menu without signing out
  }

  useEffect(() => {
    if (!userName) {
      navigate("/login");
    } else {
      populateQuote(token);
    }
  }, [userName, token, navigate]);

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
      <AppBar sx={{ backgroundColor: "black" }} position="fixed">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            GoodThoughts
          </Typography>

          <Button
            size="large"
            onClick={() => {
              navigate("/my-collections");
            }}
            sx={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
              textTransform: "none",
              bgcolor: "inherit",
              color: "white",
              ":hover": {
                bgcolor: "white",
                color: "black",
              },
            }}
          >
            My Collection
          </Button>

          <Button
            size="large"
            onClick={handleMenuClick}  // Open the menu when clicked
            sx={{
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
              textTransform: "none",
              bgcolor: "black",
              color: "white",
              ":hover": {
                bgcolor: "white",
                color: "black",
              },
            }}
          >
            <Typography component="div">Hello, {userName}!</Typography>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}  // Opens the menu if 'open' is true
            onClose={handleCloseMenu}  // Close the menu without performing any action
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>  {/* Handle sign out on click */}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, mt: 8, p: 3 }}>
        {/* Loading state */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
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
