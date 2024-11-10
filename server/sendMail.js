const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
// Load environment variables from the .env file
dotenv.config();
function getRandomFiveDigitNumber() {
  return Math.floor(10000 + Math.random() * 90000);
}
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.USER_MAIL_ID,
    pass: process.env.APP_PSWD,
  },
});

const sendMail = async (transporter, email) => {
  try {
    const otp = getRandomFiveDigitNumber()
    const mailOptions = {
      from: {
        name: "Morning Codes",
        address: process.env.USER_MAIL_ID,
      }, // sender address
      to: email, // list of receivers
      subject: "GoodThoughts OTP", // Subject line
      text: `OTP for email verfication : ${otp}. Please do not share your OTP with anynone`, // plain text body
      html: `Your OTP for email verfication : <b>${otp}.<br>Please do not share your OTP with others.<br><br>Thanks!`, // html body
      // attachments: {
      //   filename: "CV_Nov2024_V3.pdf",
      //   path: path.join(__dirname,"assets", "CV_Nov2024_V3.pdf"),
      // },
    };
    await transporter.sendMail(mailOptions);
    console.log('Email has been sent successfully!')
    return {
      status : 'Success',
      otp : otp,
      reason : 'Email sent successfully'
    }
  } catch (error) {
    console.log("Error : ", error);
    return {
      status : 'Failed',
      reason : error.message
    }
  }
};

// await sendMail(transporter, mailOptions);
const sendOTPToUser = async (email) => {
  return sendMail(transporter, email);  
}
module.exports = sendOTPToUser;
