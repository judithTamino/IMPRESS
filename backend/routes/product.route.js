import { Router } from 'express';
import upload from '../middlewares/multer.middleware.js';
import { protectRoute, admin } from '../middlewares/auth.middleware.js';
import { createProduct, getAllProducts, getAllActiveProducts, getProductInfo, updateProduct, deletepProduct } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/', protectRoute, admin, upload.array('images'), createProduct);
productRouter.get('/', getAllActiveProducts);
productRouter.get('/all', protectRoute, admin, getAllProducts);
productRouter.get('/:id', getProductInfo);
productRouter.put('/:id', protectRoute, admin, upload.array('images'), updateProduct);
productRouter.patch('/:id', protectRoute, admin, deletepProduct);

export default productRouter;