import { Router } from 'express';

import upload from '../middlewares/multer.middleware.js';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import { addProduct, getAllProducts, getAllActiveProducts, getProductInfo, updateProduct, deletepProduct } from '../controllers/product.controller.js';

import { validate } from '../middlewares/joi.middleware.js';
import { productSchema } from '../validations/product.validation.js';

const productRouter = Router();

productRouter.post('/', validate(productSchema), protectRoute, adminRoute, upload.array('images'), addProduct);
productRouter.get('/', getAllActiveProducts);
productRouter.get('/all', protectRoute, adminRoute, getAllProducts);
productRouter.get('/:id', getProductInfo);
productRouter.put('/:id', validate(productSchema), protectRoute, adminRoute, upload.array('images'), updateProduct);
productRouter.patch('/:id', protectRoute, adminRoute, deletepProduct);

export default productRouter;