import { Router } from 'express';
import linkifyCont from '../controllers/linkify.controller.js';
import checkAuth from '../middleware/check.middleware.js';
const router = Router();

router.post('/create', checkAuth, linkifyCont.create);

router.post('/fetch', linkifyCont.fetch);

router.post('/fetch/one/:id', linkifyCont.fetchOne);

router.post('/delete/:id', checkAuth, linkifyCont.delete);

export default router;
