import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import axios from "axios";
export const VerifyEmail = () => {
  const [otpFromUser, setOtpFromUser] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null); // State to track verification status
  const [open, setOpen] = useState(false); // State to manage collapse animation
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { name, token, otp, email } = location.state;

  // Handle OTP verification
  async function handleVerifyEmail() {
    setLoading(true);
    const isValid = await bcrypt.compare(otpFromUser, otp);
    if (isValid) {
      setVerificationStatus("success"); // Set success status if OTP is correct

      setOpen(true); // Show success message with animation
      const isUserVerified = await updateUserVerificationStatus(email);
      if (isUserVerified === "ok") {
        console.log("Email Verification Successful");
        navigate("/dashboard", {
          state: { userName: name, token: token },
        });
      }
    } else {
      setVerificationStatus("error"); // Set error status if OTP is incorrect
      setOpen(true); // Show error message with animation
      console.log("Invalid OTP");
    }
  }
  async function updateUserVerificationStatus(email) {
    const baseUrl = import.meta.env.VITE_BASEURL;
    const apiUrl = `${baseUrl}api/verify-user`;
    const response = await axios.patch(apiUrl, {
      email: email,
      isVerified: true,
    });
    return response.data.status;
  }

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {loading ? (
          <>
            {/* Collapse transition for Alert */}
            <Box
              display={"flex"}
              flexDirection={"column"}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <CircularProgress />
            </Box>
          </>
        ) : (
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
            <Typography
              variant="h6"
              align="center"
              color="primary"
              gutterBottom
            >
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
            <Box display={"flex"} flexDirection={"column"} rowGap={"1rem"}>
              <TextField
                fullWidth
                label="OTP"
                type="password"
                variant="filled"
                value={otpFromUser}
                onChange={(e) => setOtpFromUser(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleVerifyEmail}
                fullWidth
                sx={{ padding: "10px 0", fontSize: "16px" }}
              >
                Verify Email
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </>
  );
};
