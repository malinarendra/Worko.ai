const jwt = require("jsonwebtoken")

const generateToken = async (payload) => {
    let token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME })
    return token
}

const checkToken = async (req, res, next) => {
    // Extract token from cookie named "Authorization"
    const token = req.cookies.Authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        // Verify token
        await jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY); // Remove 'Bearer ' prefix before verification

        // Proceed to next middleware or route handler
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        } else {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
};

module.exports = { generateToken, checkToken }