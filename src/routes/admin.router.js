import { Router } from 'express'
import adminController from '../controllers/admin.controller.js';

const router = Router()

router.get('/admins', adminController.GET);
router.post('/signin', adminController.LOGIN);
router.post('/signup', adminController.REGISTER);

export default router;