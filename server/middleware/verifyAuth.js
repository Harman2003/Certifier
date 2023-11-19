const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

const verifyOAuth = async (req, res, next) => {
    const oauth = req.body.oauth;
    if (oauth) {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.sendStatus(403);
        const token = authHeader.split(" ")[1];
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.OAUTH_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const name = payload["name"];
            const email = payload["email"];

            if (email != req.body.email) {
                throw new Error("oauth token verification failed");
            }
            console.log("success OAuth");
        } catch (err) {
            console.log(err);
            return res
                .status(403)
                .json({ message: "Google account verification failed" });
        }
    }
    next();
}

module.exports = verifyOAuth;
