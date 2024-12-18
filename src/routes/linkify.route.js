import { Router } from 'express';
import linkifyCont from '../controllers/linkify.controller.js';
const router = Router();

router.post('/create', linkifyCont.create);

router.post('/fetch', linkifyCont.fetch);

router.post('/fetch/one/:id', linkifyCont.fetchOne);

router.post('/delete/:id', linkifyCont.delete);

export default router;
