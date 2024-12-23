import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
const router = Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

// router.post('/protected-route', authController.protectedRoute)

export default router;
