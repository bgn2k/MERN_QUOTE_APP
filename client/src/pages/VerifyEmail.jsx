import { Alert, Box, Button, Collapse, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const VerifyEmail = () => {
  const [otpFromUser, setOtpFromUser] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null); // State to track verification status
  const [open, setOpen] = useState(false); // State to manage collapse animation
  const location = useLocation();
  const navigate = useNavigate();
  const { otp } = location.state;

  // Handle OTP verification
  function handleVerifyEmail() {
    if (Number(otpFromUser) === otp) {
      setVerificationStatus("success"); // Set success status if OTP is correct
      setOpen(true); // Show success message with animation
      console.log('Email Verification Successful');

      // After success, navigate to login after 3 seconds
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 3000); // Wait for 3 seconds before navigating
    } else {
      setVerificationStatus("error"); // Set error status if OTP is incorrect
      setOpen(true); // Show error message with animation
      console.log('Invalid OTP');
    }
  }

  return (
    <>
      <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" align="center">
          An OTP is being sent to your email address. <br />Please enter the same.
        </Typography>

        {/* Collapse transition for Alert */}
        <Collapse in={open}>
          {verificationStatus === "success" && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              OTP Verified Successfully! Redirecting to Login...
            </Alert>
          )}
          {verificationStatus === "error" && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              Invalid OTP! Please try again.
            </Alert>
          )}
        </Collapse>

        <TextField
          label="OTP"
          type="password"
          variant="outlined"
          value={otpFromUser}
          onChange={(e) => setOtpFromUser(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleVerifyEmail}
        >
          Verify Email
        </Button>
      </Box>
    </>
  );
};
