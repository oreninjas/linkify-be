import { Router } from 'express';
import linkifyCont from '../controllers/linkify.controller.js';
import checkAuth from '../middleware/check.middleware.js';
const router = Router();

router.post('/create', checkAuth, linkifyCont.create);

router.get('/fetch', linkifyCont.fetch);

router.get('/userlinkifies', checkAuth, linkifyCont.UserLinkifies);

router.get('/fetch/:id', linkifyCont.fetchOne);

router.post('/delete/:id', checkAuth, linkifyCont.delete);

export default router;
