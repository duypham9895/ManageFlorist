const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    // Get token from header
    // console.log(req.header("x-auth-token"));
    const token = req.header("x-auth-token");

    // console.log();
    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify token
    try {
        const decode = jwt.decode(token, config.get("jwtSecret"));

        req.account = decode.account;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
};
