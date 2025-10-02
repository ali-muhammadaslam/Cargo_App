import express from 'express';
import { getStats } from '../controllers/adminController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', authMiddleware, adminMiddleware, getStats);

export default router;
