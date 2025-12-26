import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.get('/me', authMiddleware, (req, res) => {
    res.status(200).json({
        authenticated: true,
        user: req.user
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // true in production
    });
    res.status(200).json({ message: 'Logged out' });
});



export default router;
