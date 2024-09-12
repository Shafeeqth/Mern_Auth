import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'


/**
 * @desc Auth user/set token 
 * route POST /api/users/auth
 * @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {

       return  res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email

        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }


});
/**
 * @desc Register user
 * route POST /api/users
 * @access Public
 */
export const  authUser = asyncHandler((req, res) => {

    res.status(200).json({ message: "Register User" });

});
/**
 * @desc Logout user
 * route GET /api/users/logout
 * @access Public
 */
export const logoutUser = asyncHandler((req, res) => {

    res.status(200).json({ message: "logout User" });

});
/**
 * @desc Get user profile 
 * route GET /api/users/auth
 * @access Private
 */
export const getUserProfile = asyncHandler((req, res) => {

    res.status(200).json({ message: "User User" });

});
/**
 * @desc Update user profile 
 * route Put /api/users/auth
 * @access Private
 */
export const updateUserProfile = asyncHandler((req, res) => {

    res.status(200).json({ message: "Update user profile" });

});