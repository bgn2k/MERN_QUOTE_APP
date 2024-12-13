import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerValidatorSchema } from "../validators/register";
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPswd: "",
  dob: "",
};
export const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: registerValidatorSchema,
    onSubmit: async (values) => {
      console.log("VALUES : ", values);
      await registerUser();
    },
  });
  console.log("VALUES: ", values);
  console.log("ERRORS: ", errors);

  async function registerUser() {
    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_BASEURL;
      const response = await axios.post(
        `${baseUrl}api/register`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
          dob: values.dob,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      let data = response.data;
      data.email = values.email;
      //Be sure to change this to ok when testing is done.
      if (data.status === "ok") {
        const otpResponse = await axios.post(`${baseUrl}api/verify-email`, {
          email: values.email,
        });
        if (otpResponse?.data?.status === "Success") {
          //TODO : make isVerified to true in mongodb make call for that from here.
          data.otp = otpResponse.data.otp;
          navigate("/verify-email", { state: data });
        }
      } else {
        alert(`Error: Something went wrong try again`);
        resetForm();
        setLoading(false);
        navigate("/register");
      }
    } catch (error) {
      alert("Registration failed. Please try again.", error);
      resetForm();
      setLoading(false);
      navigate("/register");
    }
  }

  function handleLogin() {
    navigate("/login");
  }

  return (
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
      {loading ? (
        <CircularProgress />
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
          <Typography variant="h4" color="primary" gutterBottom>
            Create Your Account
          </Typography>
          <Typography variant="body1" paragraph>
            Register now to get started!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginBottom: 2,
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              color="primary"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && errors.name}
              helperText={touched.name && errors.name}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              color="primary"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              color="primary"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
              helperText={touched.password && errors.password}
              fullWidth
            />
            <TextField
              name="confirmPswd"
              label="Confirm Password"
              type="password"
              variant="outlined"
              color="primary"
              value={values.confirmPswd}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPswd && errors.confirmPswd}
              helperText={touched.confirmPswd && errors.confirmPswd}
              fullWidth
            />
            <TextField
              name="dob"
              label="Date of birth"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              variant="outlined"
              color="primary"
              value={values.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.dob && errors.dob}
              helperText={touched.dob && errors.dob}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ padding: "10px 0", fontSize: "16px" }}
            >
              Register
            </Button>
          </Box>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleLogin}
            sx={{ padding: "10px 0", fontSize: "16px" }}
          >
            Login
          </Button>
        </Paper>
      )}
    </Box>
  );
};
