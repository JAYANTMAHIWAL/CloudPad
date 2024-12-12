const jwt = require('jsonwebtoken');
const JWT_secret = "Citsc@178";

const fetchUser = (req, res, next) => {
    try {
        // Get the user from the jwt token and add id to req object
        const token = req.header("auth-header");     // get token from header
        if (!token) {
            res.status(400).send({ success: false, error: "Enter the token" });
            return;
        }
        const data = jwt.verify(token, JWT_secret);   // verify token
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ success: false, error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchUser;