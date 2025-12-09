import { Router } from 'express';

import upload from '../middlewares/multer.middleware.js';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/joi.middleware.js';    

import { addProduct, getAllProducts, getProductInfo, updateProduct, deletepProduct, getFilters } from '../controllers/product.controller.js';

import { productSchema } from '../validations/product.validation.js';

const productRouter = Router();

productRouter.post('/', protectRoute, adminRoute, upload.array('images', 3), validate(productSchema), addProduct);

productRouter.get('/', protectRoute, getAllProducts);
productRouter.get('/filters', getFilters);
productRouter.get('/:id', getProductInfo);

productRouter.put('/update/:id', protectRoute, adminRoute, upload.array('images', 3), validate(productSchema), updateProduct);

productRouter.patch('/delete/:id', protectRoute, adminRoute, deletepProduct);

export default productRouter;