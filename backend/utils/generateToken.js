import jwt from 'jsonwebtoken';

 const generateToken = (res, userId) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {
            expiresIn: '1d',
            issuer: 'shafeeq.com'
        });
        
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict', 
            maxAge: 1 * 24 * 60 * 60 * 1000
    
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, error: true, message: "Something went wrong"})
        
    }
 }

 export default generateToken;
