import { Router } from 'express';
import productController from '../controllers/order.controller.js';

const router = Router()

router.get('/orders', productController.GET);
router.post('/orders', productController.ORDER_PRODUCT);
router.get('/orders/:id', productController.GET_SINGLE_ORDER);
router.delete('/orders/:id', productController.DELETE_PRODUCT);

export default router;