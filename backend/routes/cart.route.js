import { Router } from 'express';
import { addToCart, getAllItems, removeAllFromCart } from '../controllers/cart.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/joi.middleware.js';
import { cartSchema } from '../validations/cart.validation.js';

const cartRouter = Router();

cartRouter.get('/', protectRoute, getAllItems);
cartRouter.delete('/', protectRoute, removeAllFromCart);
cartRouter.post('/add/:id', validate(cartSchema), protectRoute, addToCart);


export default cartRouter;  