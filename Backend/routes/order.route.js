// server/routes/orders.js
import express from 'express';
import { createOrder } from '../controllers/order.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getMyOrders } from '../controllers/order.controller.js';

const router = express.Router();

// Protected: only logged-in users can place order
router.post('/', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getMyOrders);

export default router;