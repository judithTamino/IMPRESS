import { Router } from 'express';
import upload from '../middlewares/multer.middleware.js';
import { protectRoute, admin } from '../middlewares/auth.middleware.js';
import { createProduct, getAllProducts, getProductInfo } from '../controllers/product.controller.js';

const productRouter = Router();

productRouter.post('/', protectRoute, admin, upload.array('images'), createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductInfo);

export default productRouter;