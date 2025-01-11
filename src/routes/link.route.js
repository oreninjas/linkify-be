// Hey there, let me guide you throught this file cause the name is confusing, isn't it?
// So with the name link, i meant to take reference as work releted to performing operations inside `linkify's links` !!

import { Router } from 'express';
import checkAuth from '../middleware/check.middleware.js';
import linkController from '../controllers/link.controller.js';
const router = Router();

router.post('/create/:id', checkAuth, linkController.create);

// Fetch whole links
router.get('/fetch/:id', checkAuth, linkController.fetchOneCategory); // :id refers to intire category;

export default router;
