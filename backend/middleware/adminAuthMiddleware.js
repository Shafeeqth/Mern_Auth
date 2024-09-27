import JWT from "jsonwebtoken";
import User from "../models/userModel";

export const adminAuth = async (req, res, next) => {
    let adminToken = req.cookies.adminToken;
    if (!adminAuth) {
        return res.status(403)
            .json({
                success: false,
                error: true,
                message: 'Unautherized access - Admin token not found!'
            })
    }

    try {
        const decoded = JWT.verify(adminToken, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        console.error('Token Verification error: ',error);
        res.status(403)
        .json({
            success: false,
            error: true,
            message: "Unautherized - Invalid admin token"
        });
        
    }

}

