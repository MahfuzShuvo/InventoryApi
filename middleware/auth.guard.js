const jwt = require('jsonwebtoken');


/**
 * Middleware for check authentication
 */
const Authguard = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { userName, userId } = decoded;
        req.userName = userName;
        req.userId = userId;

        next();
    } catch (err) {
       next('Authentication error!')
    }
}

module.exports = Authguard;