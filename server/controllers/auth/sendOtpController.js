const UserOtpData = require("../../model/OTP");
const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const generateOTP = require("../../utils/generateOtp");
const otpMessage = require("../../utils/otpMessage");
require("dotenv").config();

const sendOtp = async (req, res) => {
  const validator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  try {
    const { email } = req.body;
    console.log(email);
    if(!email || !validator.test(email))return res.status(401).json({message:"Invalid Email"})
    const foundUser = await User.findOne({ email: email });
    if (foundUser) return res.status(409).json({ message: "Email already registered" });
    const otp = generateOTP();
    const token = jwt.sign(
      {
        email: email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    const hashedOtp = await bcrypt.hash(otp, 10);

    //send mail to user
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailDetails = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Certify verification OTP",
      html: otpMessage(otp),
    };
    const response=await transporter.sendMail(mailDetails);
    console.log(response);
    //create or update the user
    const newUser = {
      email: email,
      otp: hashedOtp,
      isverified: false,
    };
    await UserOtpData.findOneAndUpdate({ email: email }, newUser, {
      upsert: true,
      new: true,
      runValidators: true,
    });

    res.status(200).json({token:token, message:"Otp sent successfully"});
  } catch (err) {
    res.status(500).json({message:"Something went wrong"});
    console.log(err);
  }
};

module.exports = sendOtp;
