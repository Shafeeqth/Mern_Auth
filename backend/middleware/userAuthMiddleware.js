import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.userToken;

    if (!token) {
        res.status(401);
        throw new Error("NOt authorized, no token");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
         
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");

    }

});