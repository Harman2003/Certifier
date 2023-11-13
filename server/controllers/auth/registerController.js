const bcrypt = require("bcrypt");
const User = require("../../model/User");
const UserVerification = require("../../model/VerifyOTP");
const handleLogin = require("./loginController");
const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { fullname, email, password, role, orgid } = req.body;
    if (!fullname || !email || !password || !role)
      return res.status(400).json({ message: "Invalid User Registration" });

    const duplicate = await User.findOne({ email: email });
    if (duplicate) return res.sendStatus(409); //conflict
    const isverified = await UserVerification.findOne({ email: email });
    if (!isverified)
      return res.status(403).json({ message: "Email not verified" });
    //encrypt
    const hashedPass = await bcrypt.hash(password, 10);

    //store the new user
    const newUser = {
      name: fullname,
      email: email,
      password: hashedPass,
      role: role,
    };
    await User.create(newUser);

    await handleLogin(req, res);
  
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
    console.log(err);
  }
};

module.exports = registerUser;
