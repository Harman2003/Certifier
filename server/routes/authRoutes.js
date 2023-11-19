const express = require("express");
const router = express.Router();
const handleLogin = require("../controllers/auth/loginController");
const refreshJWT = require("../controllers/auth/refreshController");
const registerUser = require('../controllers/auth/registerController')
const sendOtp = require("../controllers/auth/sendOtpController");
const verifyOtpController = require("../controllers/auth/verifyOtpController");
const verifyOtpToken = require("../middleware/verifyOtpToken");
const verifyOAuth = require("../middleware/verifyAuth");
router.get("/refresh", refreshJWT);
router.post('/sendotp', sendOtp);
router.post("/login", verifyOAuth, handleLogin);
router.post("/verifyotp", verifyOtpToken,verifyOtpController);
router.post("/register", verifyOtpToken,verifyOAuth, registerUser);


module.exports = router;