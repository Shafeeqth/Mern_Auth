import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";
import cloudinary from "../utils/setupCloudinary";

/**
 * @desc Auth admin/set Token
 * @method POST api/admin/
 * @access public
 */
export const authAdmin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const admin = await User.findOne({email});
    if(!admin || !admin?.isAdmin) {
        return res.status(403)
        .json({
            success: false,
            error: false,
            message: "Invalid admin Email Id"
        })
    }
    const isPasswordMatch = await admin.matchPasswords(password);
    if(!isPasswordMatch) {
        return res.status(401).json({
            error: true,
            success: false,
            message: "incorrect Password!"
        })
    }
    generateToken(res, admin._id, 'adminJWT')
    return  res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
    })
});

const createUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !password || !email) {
       return res.status(400)
        .json({
            error: true,
            success: false,
            message: "All feilds are required!"
        })
    }
    const alreadyAUser = await User.findOne({email});
    if(alreadyAUser) {
        return res.status(400)
        .json({
            error: true,
            success: false,
            message: 'Email already exist!',
        })
    }

    if(req.body?.image) {

    }
})

/**
 * @desc Signout Admin
 * @method POST api/admin/logout
 * @access Private
 */
export const adminSignout = asyncHandler(async (req, res) => {
    res.cookie('adminJWT', "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        error: false,
        success: true,
        message: 'Logout successful!'
    })
})