import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import "@fontsource-variable/montserrat";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Quote = ({ quoteArr }) => {
  const navigate = useNavigate()
  const [copiedIndex, setCopiedIndex] = useState(null); // Track which quote is copied
  function copyToClipboard(quote, index) {
    navigator.clipboard
      .writeText(quote)
      .then(() => {
        setCopiedIndex(index); // Set the copied index
        console.log("Successfully Copied Quote");

        // Reset after 3 seconds
        setTimeout(() => {
          setCopiedIndex(null);
        }, 3000); // 3000ms = 3 seconds
      })
      .catch((err) => console.log("Failed to copy quote : ", err));
  }
  const heroQuote = quoteArr[quoteArr.length - 1];
  const author = (heroQuote) => {
    return heroQuote?.a !== "Unknown" ? heroQuote.a : "Someone Wise";
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        {/* Upper Divider */}
        <Divider sx={{ my: 2, width: "100%" }} />
        {/* Quote Text */}
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontFamily: "Rubik, sans-serif",
            fontWeight: 300,
          }}
        >
          "{heroQuote.q}"
        </Typography>
        <br />
        {/* Quote Author */}
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            fontFamily: "Rubik, sans-serif",
            fontWeight: 300,
          }}
          className="poppins-medium"
        >
          - {author(heroQuote)}
        </Typography>
        {/* Lower Divider */}
        <Divider sx={{ my: 2, width: "100%" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box>
          {quoteArr.map((item, index) => (
            <Paper
              elevation={16}
              key={index}
              sx={{ marginBottom: "2%", height: "auto" }}
            >
              <Card>
                <CardContent>
                  <Typography
                    sx={{
                      fontFamily: "Rubik, sans-serif",
                      fontWeight: 400,
                      fontSize: "28px",
                    }}
                  >
                    {item.q}
                  </Typography>
                  <br />
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "20px",
                      fontFamily: "Rubik, sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    -{author(item)}
                  </Typography>
                </CardContent>
                <Divider></Divider>
                <CardActions>
                  {copiedIndex === index ? (
                    <Chip
                      color="success"
                      sx={{
                        fontSize: "16px",
                        color: "white",
                      }}
                      label="Copied"
                    />
                  ) : (
                    <Tooltip
                      // title={
                      //   <Typography
                      //     sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                      //   >
                      //     Copy
                      //   </Typography>
                      // }
                      arrow
                    >
                      <Chip
                        label="Copy"
                        onClick={() => copyToClipboard(item.q, index)}
                        sx={{
                          bgcolor: "black",
                          color: "white",
                          cursor: "pointer",
                          fontSize: "16px",
                          ":hover": { bgcolor: "black", color: "white" },
                        }}
                      />
                    </Tooltip>
                  )}

                  <Chip
                    label="Save"
                    onClick = {() => navigate('/my-collections')}
                    sx={{
                      fontSize: "16px",
                      bgcolor: "black",
                      color: "white",
                      cursor: "pointer",
                    }}
                  ></Chip>
                </CardActions>
              </Card>
            </Paper>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Quote;
