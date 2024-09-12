import express from 'express';
const router = express.Router();
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controller/userController.js';

router.post('/auth', authUser)
router.post('/', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile);


export default router;