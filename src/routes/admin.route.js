import { Router } from 'express';
import adminController from '../controllers/admin.controller';
const router = Router();

router.post('/dashboard', adminController.verifyDashboardAccess);

export default router;
