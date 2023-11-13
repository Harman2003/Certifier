const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).json({message:"Invalid Login"});

    const foundUser = await User.findOne({ email: email });
    if (!foundUser) return res.sendStatus(401); //unauthorized
    console.log(password, foundUser.password)
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const accessToken = jwt.sign(
        {
          email: foundUser.email,
          role: foundUser.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      const refreshToken = jwt.sign(
        {
          email: foundUser.email,
          role: foundUser.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "10d" }
      );

      await User.updateOne(
        { _id: foundUser["_id"] },
        { refreshToken: refreshToken },
        { runValidators: true }
      );

      res.cookie("jwt", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });
      res.json({
        accessToken,
        email: foundUser.email,
        role: foundUser.role,
        message:"Successfully Logged In"
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message:"Something Went Wrong"});
  }
};

module.exports = handleLogin;
