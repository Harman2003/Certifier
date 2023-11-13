const UserOtpData = require("../../model/VerifyOTP");
const bcrypt = require("bcrypt");

require("dotenv").config();
const verifyOtp = async (req, res) => {
    try {
        const {email, otp} = req.body;
        const user = await UserOtpData.findOne({ email: email });
        const match = await bcrypt.compare(otp, user.otp);
        if (match) {
            user.isverified = true;
            await user.save();
            res.status(200).json({ message: "Successfully Verified" });
        } else {
            res.status(401).json({ message: "OTP didn't matched" });
        }
    } catch (err) {
        console.log(err);
        res.send(500).json({ message: "Something Went Wrong" });
    }
};

module.exports = verifyOtp;
