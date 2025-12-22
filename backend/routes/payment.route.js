import { Router } from 'express';
const paymentRouter = Router();

import * as payment from '../controllers/payment.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

paymentRouter.post('/orders/:id/stripe', protectRoute, payment.payWithStripe);

export default paymentRouter;