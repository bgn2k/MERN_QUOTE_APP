import { Box, Card, CardContent, Typography, Pagination, Stack, Button, Grid, Snackbar, Alert } from "@mui/material";
import CopyIcon from '@mui/icons-material/FileCopy'; // Importing Material Icon for Copy
import React, { useState } from "react";

const Quote = ({ quoteArr }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 4; // Display 4 quotes per page
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state

  // Calculate the total number of pages
  const totalPages = Math.ceil(quoteArr.length / quotesPerPage);

  // Calculate the current quotes to display
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = quoteArr.slice(indexOfFirstQuote, indexOfLastQuote);

  // Change the page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Function to copy quote to clipboard
  const copyToClipboard = (quote) => {
    navigator.clipboard.writeText(quote)
      .then(() => {
        setSnackbarOpen(true); // Open snackbar on successful copy
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Close snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        marginTop: "5%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        px: 2,
      }}
    >
      <Grid container spacing={3}>
        {currentQuotes.map((quote, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "16px",
                transition: "transform 0.3s, box-shadow 0.3s",
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "#1976d2",
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  “
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.1rem",
                    color: "#333",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    mb: 2,
                  }}
                >
                  {quote.q}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#555",
                    textAlign: "right",
                  }}
                >
                  - {quote.a}
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "#1976d2",
                    fontWeight: "bold",
                    mt: 1,
                  }}
                >
                  ”
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<CopyIcon />}
                  sx={{
                    mt: 2,
                    backgroundColor: "#1976d2",
                    color: "#ffffff",
                    '&:hover': {
                      backgroundColor: "#1565c0",
                    },
                  }}
                  onClick={() => copyToClipboard(quote.q)}
                >
                  Copy Quote
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Control */}
      <Stack spacing={2} sx={{ mt: 3, width: '100%', alignItems: 'center' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '8px',
              transition: 'background-color 0.2s, color 0.2s',
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: '#e3f2fd', // Light blue on hover
              color: '#1976d2', // Primary color
            },
          }}
        />
      </Stack>

      {/* Snackbar for Copy Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Automatically hide after 3 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Quote copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Quote;
