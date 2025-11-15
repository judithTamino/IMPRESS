import { Router } from 'express';
import { addItemToCart, getAllItems, removeItemFromCart } from '../controllers/cart.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/joi.middleware.js';
import { cartSchema } from '../validations/cart.validation.js';

const cartRouter = Router();

cartRouter.get('/', protectRoute, getAllItems);
cartRouter.post('/add/:id', validate(cartSchema), protectRoute, addItemToCart);
cartRouter.delete('/remove/:id', protectRoute, removeItemFromCart);

export default cartRouter;  