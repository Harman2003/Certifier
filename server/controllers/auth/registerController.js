const bcrypt = require("bcrypt");
const User = require("../../model/User");
const UserVerification = require("../../model/OTP");
const handleLogin = require("./loginController");
const validatePassword = require("../../utils/validatePassword");
const customProfilePic = require("../../utils/customProfile");
const registerUser = async (req, res) => {
  const { fullname, email, password, role, picture, oauth } = req.body;

  if(!fullname)return res.status(400).json({message:"Please Enter your full Name"})
  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be min. 8 character long with atleast one uppercase and a special character",
    });
  }

  try {
    const duplicate = await User.findOne({ email: email });
    if (duplicate) {
      if (oauth) {
        await handleLogin(req, res);
        return;
      } else {
        return res.sendStatus(409);
      } //conflict
    }

      if (!role) {
        return res
          .status(400)
          .json({ message: "Please choose your role at Certify" });
      }

    if (!oauth) {
      const isverified = await UserVerification.findOne({ email: email });
      if (!isverified) {
        return res.status(403).json({ message: "Email not verified" });
      }
    }

    //encrypt
    const hashedPass = await bcrypt.hash(password, 10);
    //store the new user
    const newUser = {
      name: fullname,
      email: email,
      password: hashedPass,
      role: role,
      picture: picture || customProfilePic(fullname),
      oauth: oauth,
    };
    await User.create(newUser);

    await handleLogin(req, res);
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
    console.log(err);
  }
};

module.exports = registerUser;
