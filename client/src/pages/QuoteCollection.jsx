import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const QuoteCollection = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">
          This service is under construction. <br />
          Stay tuned for more updates.
        </Typography>
        <Button
        size="large"
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{
            marginTop : '2.5%',
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
          Back
        </Button>
      </Box>
    </>
  );
};
