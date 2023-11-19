const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err !== null || req.query.email != decoded.email || req.query.role != decoded.role) {
      console.log(err)
      return res.sendStatus(403);
    }
    next();
  });
};

module.exports = verifyJWT;
