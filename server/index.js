const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
const axios = require("axios");
const fs = require("fs");
try {
  mongoose.connect(
    "mongodb+srv://bgnarendra:1234@learnnodejs.yxl7k.mongodb.net/Authentication?retryWrites=true&w=majority&appName=learnNodeJS"
  );
  console.log("Mongo DB connected");
} catch (error) {
  console.log("Failed To Connect Mongo DB");
}
/**
 * Route to register user
 */
app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok", message: "User successfully registered" });
  } catch (error) {
    res.json({ status: "error", error: "Duplicate User Error" });
  }
});
/**
 * Route to login a given user
 */
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign({ name: user.name, email: user.email }, "secret123");
    res.json({
      status: "ok",
      name: user.name,
      token: token,
      message: "User Found",
    });
  } else {
    res.json({ status: "error", message: "User Not Found" });
  }
});
/**
 * Route to trigger the quote api and get quotes
 */
app.get("/api/quote", async (req, res) => {
  const token = req.headers["access-token"];
  const filePath = "quotes.json";

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
      console.log(quoteArr[1]);
      return res.json({ status: "OK", data: quoteArr });
    }
  } catch (error) {
    res.json({ status: "error", message: "Invalid Token", error : error.message });
  }
});
app.listen(4000, () => {
  console.log("Server started at 4000");
});
