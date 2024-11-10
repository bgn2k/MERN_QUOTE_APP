const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

function getRandomFiveDigitNumber() {
  return Math.floor(10000 + Math.random() * 90000);
}
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  //This set to 465 and make secure to true. This resovled the missing credentials for plain error.
  //Even though app pswd if that has spaces in them vercel will make it work no issues there.
  port: 465, // Changed to secure port 
  secure: true, // Use true for secure connection
  auth: {
    user: process.env.USER_MAIL_ID || '',
    pass: process.env.APP_PSWD || '',
  },
});

const sendMail = async (transporter, email) => {
  try {
    const otp = getRandomFiveDigitNumber();
    const mailOptions = {
      from: {
        name: "Morning Codes",
        address: process.env.USER_MAIL_ID,
      },
      to: email,
      subject: "GoodThoughts OTP",
      text: `OTP for email verification: ${otp}. Please do not share your OTP with anyone.`,
      html: `<b>Your OTP for email verification: ${otp}.<br>Please do not share your OTP with others.<br><br>Thanks!</b>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email has been sent successfully!');
    return {
      status: 'Success',
      otp: otp,
      reason: 'Email sent successfully',
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      status: 'Failed',
      reason: error.message,
    };
  }
};

const sendOTPToUser = async (email) => {
  return sendMail(transporter, email);  
};

module.exports = sendOTPToUser;
