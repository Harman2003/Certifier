const express = require("express");
const router = express.Router();
const handleLogin = require("../controllers/auth/loginController");
const refreshJWT = require("../controllers/auth/refreshController");
const registerUser = require('../controllers/auth/registerController')
const sendOtp = require("../controllers/auth/sendOtpController");
const verifyOtp = require("../controllers/auth/verifyOtpController");
const verifyOtpJwt = require("../middleware/verifyOtpJwt");

router.post("/login", handleLogin);
router.get("/refresh", refreshJWT);
router.post('/sendotp', sendOtp);
router.use(verifyOtpJwt);
router.post('/verifyotp', verifyOtp);
router.post('/register', registerUser);


module.exports = router;