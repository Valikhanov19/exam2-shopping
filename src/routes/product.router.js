import { Router } from 'express';
import productController from '../controllers/product.controller.js';
import checkToken from '../middlewares/checkToken.js';

const router = Router()

router.get('/products', checkToken, productController.GET);
router.post('/products', checkToken, productController.CREATE_PRODUCT);
router.get('/products/:id',checkToken, productController.GET_SINGLE_PPRODUCT);
router.put('/products/:id',checkToken, productController.UPDATE_PRODUCT);
router.delete('/products/:id', checkToken, productController.DELETE_PRODUCT);

export default router;