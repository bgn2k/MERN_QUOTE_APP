import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Quote = ({ quoteArr }) => {
  console.log("QUOTE ARRAY : ", quoteArr);
  return (
    <>
      <Box sx={{ marginTop: "5%"}}>
      {quoteArr.map((quote, index) => (
        <Card key={index} sx={{ minWidth: 275, margin: "1%" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              **
            </Typography>
            <Typography variant="body1">{quote.q}</Typography>
            <br />
            <Typography sx={{ fontWeight: "bold" }}>- {quote.a}</Typography>
            <Typography variant="h5" component="div">
              **
            </Typography>
          </CardContent>
        </Card>
      ))}       
      </Box>

    </>
  );
};

export default Quote;
