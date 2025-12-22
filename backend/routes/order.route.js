import { Router } from 'express';
const orderRouter = Router();

import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/joi.middleware.js';

import { orderSchema } from '../validations/order.validation.js';
import * as order from '../controllers/order.controller.js';

orderRouter.post('/', protectRoute, validate(orderSchema), order.createOrder);
orderRouter.get('/', protectRoute, adminRoute, order.getAllOrders);
orderRouter.get('/my', protectRoute, order.getUserOrders);

orderRouter.get('/:id', protectRoute, order.getOrderById);
orderRouter.patch('/:id/cancel', protectRoute, order.cancelOrder);


export default orderRouter;