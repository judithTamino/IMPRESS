import { Router } from 'express';
import { addToCart, getCartProducts, removeFromCart } from '../controllers/cart.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/joi.middleware.js';
import { cartSchema } from '../validations/cart.validation.js';

const cartRouter = Router();

cartRouter.get('/', protectRoute, getCartProducts);
cartRouter.delete('/:id', protectRoute, removeFromCart);
cartRouter.post('/:id', validate(cartSchema), protectRoute, addToCart);


export default cartRouter;  