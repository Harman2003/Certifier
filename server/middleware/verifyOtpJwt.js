const jwt = require("jsonwebtoken");

const verifyOtpJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader)
  if (!authHeader) return res.sendStatus(403);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err !== null || req.body.email != decoded.email) {
      console.log(err?.expiredAt);
      console.log(req.body.email)
      if (err?.expiredAt) {
        return res.status(403).json({message:"Otp Expired"})
      }
        return res.status(403).json({ message: "Something Went Wrong" });
    }
    next();
  });
};

module.exports = verifyOtpJwt;
