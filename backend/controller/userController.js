import asyncHandler from 'express-async-handler';

/**
 * @desc Auth user/set token 
 * route POST /api/users/auth
 * @access Public
 */
export const authUser = (req, res) => {
    res.status(200).json({message: "Auth User"});

}