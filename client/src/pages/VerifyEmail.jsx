import {
  Alert,
  Box,
  Button,
  Collapse,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
export const VerifyEmail = () => {
  const [otpFromUser, setOtpFromUser] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null); // State to track verification status
  const [open, setOpen] = useState(false); // State to manage collapse animation
  const location = useLocation();
  const navigate = useNavigate();
  const { otp } = location.state;

  // Handle OTP verification
  async function handleVerifyEmail() {
    const isValid = await bcrypt.compare(otpFromUser, otp);
    if (isValid) {
      setVerificationStatus("success"); // Set success status if OTP is correct
      setOpen(true); // Show success message with animation
      console.log("Email Verification Successful");

      // After success, navigate to login after 3 seconds
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 3000); // Wait for 3 seconds before navigating
    } else {
      setVerificationStatus("error"); // Set error status if OTP is incorrect
      setOpen(true); // Show error message with animation
      console.log("Invalid OTP");
    }
  }

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url('https://source.unsplash.com/1600x900/?register')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: "40px",
            borderRadius: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" align="center" color="primary"gutterBottom>
            An OTP is being sent to your email address. <br />
            Please enter the same.
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
            <Box display={"flex"} flexDirection={'column'} rowGap={'1rem'}>
            <TextField
            fullWidth
            label="OTP"
            type="password"
            variant="filled"
            value={otpFromUser}
            onChange={(e) => setOtpFromUser(e.target.value)}
          />
          <Button variant="contained" onClick={handleVerifyEmail}            fullWidth
            sx={{ padding: "10px 0", fontSize: "16px" }}>
            Verify Email
          </Button>
            </Box>

        </Paper>
      </Box>
    </>
  );
};
