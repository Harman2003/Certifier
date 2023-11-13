const jwt = require('jsonwebtoken');
const UserDB = require('../../model/User');

const refreshJWT = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    const foundUser = UserDB.find({ refreshToken: refreshToken });
    if (!foundUser) return res.sendStatus(403);
    
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { email: decoded.email, role: decoded.role },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "10d" }
        );
        res.json({ email: decoded.email, role:decoded.role, accessToken });
      }
    );
}

module.exports = refreshJWT;