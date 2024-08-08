const User = require('../models/userModel'); // Ensure the correct path
const ErrorResponse = require('../utils/errorResponse');
const jwt=require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(new ErrorResponse('Not authorized for access', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); 
        
        if (!req.user) {
            return next(new ErrorResponse('User not found', 404));
        }
        next();
    } catch (error) {
        return next(new ErrorResponse('Not authorized for access', 401));
    }
};


//middleware for admin
exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin === false) { 
        return next(new ErrorResponse('Access denied, you must be an admin', 401));
    }
    next();
};

