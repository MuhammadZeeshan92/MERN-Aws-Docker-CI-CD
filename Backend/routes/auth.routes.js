import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import User from '../models/user.model.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.get('/me', authMiddleware, async (req, res) => {
    try {
        // Fetch full user data from database using req.user.id
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            authenticated: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // true in production
    });
    res.status(200).json({ message: 'Logged out' });
});



export default router;
