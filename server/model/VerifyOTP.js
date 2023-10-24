const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VerifyOTP = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("VerifyOtp", VerifyOTP);
