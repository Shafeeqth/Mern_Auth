import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js';


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
        role: 'USER'
    });

    if (user) {
        generateToken(res, user._id);

        return res.status(201).json({
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
export const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPasswords(password))) {
        generateToken(res, user._id);

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,

        });
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }



});
/**
 * @desc Logout user
 * route GET /api/users/logout
 * @access Public
 */
export const logoutUser = asyncHandler((req, res) => {
        res.cookie('jwt', '',{
            httpOnly: true,
            expires: new Date(0)
        });

        res.status(200).json({ message: "User Loggedout" });

});
/**
 * @desc Get user profile 
 * route GET /api/users/auth
 * @access Private
 */
export const getUserProfile = asyncHandler((req, res) => {
    let user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }
    res.status(200).json(user);

});
/**
 * @desc Update user profile 
 * route Put /api/users/auth
 * @access Private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(!user) {
        res.status(404);
        new Error('User not Found');
    }
    user.name = req.body.name || user.name;
    user.email = req.body || user.email;
    if(req.body.password) {
        user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
     });

});