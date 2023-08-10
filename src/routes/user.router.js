import { Router } from 'express'
import userController from '../controllers/user.controller.js';

const router = Router()

router.get('/clients', userController.GET);
router.post('/users/accaunt/:id', userController.GET_SINGLE_USER);
router.post('/users', userController.CLIENT_REGISTER);

export default router;