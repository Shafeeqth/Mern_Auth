import express from 'express';
const router = express.Router();
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controller/userController.js';
import { protect } from '../middleware/userAuthMiddleware.js';



router.post('/auth', authUser)
router.post('/', registerUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);


export default router;