import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Quote from "./Quote";
import quotesFile from "../../quotes.json";
import Footer from "./Footer";

export const Dashboard = () => {
  const [quoteArr, setQuoteArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { userName, token } = location.state || {};
  const navigate = useNavigate();

  // const handleAboutMeClick = () => {
  //   navigate('/dashboard/about-me');
  //   handleClose();
  // };

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello, {userName}!
          </Typography>
          {/* <Button variant="inherit" onClick={handleAboutMeClick}>
            Dev Profile!
          </Button> */}
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
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
