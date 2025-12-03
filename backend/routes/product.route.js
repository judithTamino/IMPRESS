import { Router } from 'express';

import upload from '../middlewares/multer.middleware.js';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import { addProduct, getAllProducts, getProductInfo, updateProduct, deletepProduct } from '../controllers/product.controller.js';

import { validate } from '../middlewares/joi.middleware.js';
import { productSchema } from '../validations/product.validation.js';

const productRouter = Router();

productRouter.post('/', validate(productSchema), upload.array('images'), protectRoute, adminRoute, addProduct);
productRouter.get('/all', protectRoute, adminRoute, getAllProducts);
productRouter.get('/:id', getProductInfo);
productRouter.put('/:id', validate(productSchema), protectRoute, adminRoute, updateProduct);
productRouter.patch('/:id', protectRoute, adminRoute, deletepProduct);

export default productRouter;