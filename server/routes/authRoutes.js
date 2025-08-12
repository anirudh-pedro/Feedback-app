import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
import { registerUser, loginUser, refreshToken, logoutUser } from '../controllers/authController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', authMiddleware, logoutUser);

export default router;
