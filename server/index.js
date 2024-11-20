const dotenv = require('dotenv');
// Load environment variables from the .env file
dotenv.config();
const express = require("express");
const bcrypt = require('bcrypt')
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const sendOTPToUser = require('./sendMail')
app.use(cors());
app.use(express.json());
const axios = require("axios");
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("Mongo DB connected");
} catch (error) {
  console.log("Failed To Connect Mongo DB");
}
/**
 * Test Route:
 */
app.get('/test', async (req, res) => {
  try{
    res.json({serverStatus : "OK", message : "Hi User"})
  }catch(error){
    res.json({message : `Cannot display test route: ${error.message}` })
  }
})
/**
 * Route to register user
 */
app.post("/api/register", async (req, res) => {
  try {
    const pswd = req.body.password
    const hashedPassword = await bcrypt.hash(pswd, 12)
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.json({ status: "ok", message: "User successfully registered" });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});
/**
 * Route to do email verfication
 */
app.post('/api/verify-email', async (req, res) => {
try {
  const verifyEmail = await sendOTPToUser(req.body.email)
  const hashedOtp = await bcrypt.hash(verifyEmail.otp.toString(), 12)
  res.json({status : verifyEmail.status, otp : hashedOtp, reason : verifyEmail.reason})
} catch (error) {
  return res.json({status : 'Failed', message : error.message})
}
})
/**
 * Route to login a given user
 */
app.post("/api/login", async (req, res) => {
  let isValid = false
  const user = await User.findOne({
    email: req.body.email,
  });
  if(user){
    isValid = await bcrypt.compare(req.body.password, user.password)
  }
  if (user && isValid) {
    const token = jwt.sign({ name: user.name, email: user.email }, "secret123");
    res.json({
      status: "ok",
      name: user.name,
      token: token,
      message: "User Found",
    });
  } else {
    res.json({ status: "error", message: "Incorrect Credentials" });
  }
});
/**
 * Route to trigger the quote api and get quotes
 */
app.get("/api/quote", async (req, res) => {
  const token = req.headers["access-token"];

  try {
    const decodedToken = jwt.verify(token, "secret123");
    const email = decodedToken.email;
    const user = await User.findOne({ email: email });
    if (user) {
      const quoteArr = await axios
        .get("https://zenquotes.io/api/quotes/")
        .then((res) => {
          return res.data;
        });
      return res.json({ status: "OK", data: quoteArr });
    }
  } catch (error) {
    res.json({ status: "error", message: "Invalid Token", error : error.message });
  }
});
app.listen(process.env.PORT, () => {
  console.log("Server started at 4000");
});
