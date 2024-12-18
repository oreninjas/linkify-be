import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
const router = Router();

router.post('/dashboard', adminController.verifyDashboardAccess);

export default router;
