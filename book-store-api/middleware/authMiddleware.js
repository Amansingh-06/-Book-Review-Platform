const jwt = require('jsonwebtoken');
const User = require('../models/User');



exports.protectRoute = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;  // assuming your token contains user information
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};


exports.protectAdminRoute = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // If the user is an admin, proceed
    } else {
        res.status(403).json({ message: 'Forbidden, admin only' }); // Otherwise, return Forbidden error
    }
};
