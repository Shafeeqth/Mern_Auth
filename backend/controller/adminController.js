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
    const { email, password } = req.body;
    const admin = await User.findOne({ email });
    if (!admin || !admin?.isAdmin) {
        return res.status(403)
            .json({
                success: false,
                error: false,
                message: "Invalid admin Email Id"
            })
    }
    const isPasswordMatch = await admin.matchPasswords(password);
    if (!isPasswordMatch) {
        return res.status(401).json({
            error: true,
            success: false,
            message: "incorrect Password!"
        })
    }
    generateToken(res, admin._id, 'adminJWT')
    return res.status(200).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
    })
});


/**
 * @desc Create users
 * @method POST api/admin/create-user
 * @access Private
 */

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
        return res.status(400)
            .json({
                error: true,
                success: false,
                message: "All feilds are required!"
            })
    }
    const alreadyAUser = await User.findOne({ email });
    if (alreadyAUser) {
        return res.status(400)
            .json({
                error: true,
                success: false,
                message: 'Email already exist!',
            })
    }

    if (req.body?.image) {

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


/**
 * @desc Fetch user's data
 * @method GET api/admin/users
 * @access Private
 */
export const fetchUsers = asyncHandler(async (req, res) => {
    const usersData = await User.find({ isAdmin: { $eq: false } })
        .select('-password')
        .sort({ updatedAt: -1 });
    res.status(200).json({
        success: true,
        error: false,
        data: usersData,
        message: 'users data fetch successfully!'
    })
})


/**
 * @desc update user data
 * @method PUT api/admin/user:id
 * @access Private
 */
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, profileImg } = req.body;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404)
                .json({
                    error: true,
                    success: false,
                    message: 'User not found',

                })
        }
        const isUserExist = await User.findOne({ name, _id: { $ne: id } });
        const isEmailExist = await User.findOne({ email, _id: { $ne: id } });

        if (isUserExist) {
            return res.status(400)
                .json({
                    success: false,
                    error: true,
                    message: "Username already exist!"
                })
        }
        if (isEmailExist) {
            return res.status(400)
                .json({
                    success: false,
                    error: true,
                    message: "Email already exist!"
                })
        }
        if (profileImg) {
            const response = await cloudinary.uploader.upload(profileImg, {

            })
            user.profileImg = response.secure_url;
        }
        user.name = name || user.name;
        user.email = email || user.email;

        const updatedUser = await User.save();

        res.status(200)
            .json({
                error: false,
                success: true,
                message: "User detials updated successfully ",
                data: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            })


    } catch (error) {
        console.error(error);
        return res.status(500)
            .json({
                error: true,
                success: false,
                message: "Something went wrong while updating user data"
            })


    }
})


/**
 * @desc delet user
 * @method DELETE api/admin/user:id
 * @access Private
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'User not found!',
            })
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            error: false,
            message: "User account has deleted!"
        })

    } catch (error) {
        console.error(error);
        return res.status(500)
        .json({
            error:true,
            success: false,
            message: 'Something went wrong'
        })
        

    }
})



