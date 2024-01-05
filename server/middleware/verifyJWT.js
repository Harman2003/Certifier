const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  try {
     const authHeader = req.headers["authorization"];
     if (!authHeader) return res.sendStatus(403);
     const { email, role, id } = req.query;
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (
        err !== null ||
        email != decoded.email ||
        role != decoded.role ||
        id != decoded.id
        ) {
         console.log(err);
         return res.sendStatus(403);
       }
       next();
     });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
 
};

module.exports = verifyJWT;
