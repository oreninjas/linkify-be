import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import checkAuth from '../middleware/check.middleware.js';
const router = Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.get('/protected', checkAuth, authController.protectedRoute);

export default router;
