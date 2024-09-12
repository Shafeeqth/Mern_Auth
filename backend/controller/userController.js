import asyncHandler from 'express-async-handler';

/**
 * @desc Auth user/set token 
 * route POST /api/users/auth
 * @access Public
 */
export const authUser = asyncHandler((req, res) => {
   
    res.status(200).json({message: "Auth User"});

});
/**
 * @desc Register user
 * route POST /api/users
 * @access Public
 */
export const registerUser = asyncHandler((req, res) => {
   
    res.status(200).json({message: "Register User"});

});
/**
 * @desc Logout user
 * route GET /api/users/logout
 * @access Public
 */
export const logoutUser = asyncHandler((req, res) => {
   
    res.status(200).json({message: "logout User"});

});
/**
 * @desc Get user profile 
 * route GET /api/users/auth
 * @access Private
 */
export const getUserProfile = asyncHandler((req, res) => {
   
    res.status(200).json({message: "User User"});

});
/**
 * @desc Update user profile 
 * route Put /api/users/auth
 * @access Private
 */
export const updateUserProfile = asyncHandler((req, res) => {
   
    res.status(200).json({message: "Update user profile"});

});