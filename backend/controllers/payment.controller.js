import asyncHandler from 'express-async-handler';
import * as stripeService from '../services/stripe.service.js';

// @des    Pay for the order with stripe
// @route  POST api/payments/orders/:id/stripe
// @access private
export const payWithStripe = asyncHandler(async (req, res) => {
  const user = req.user;
  const orderId = req.params.id;

  const session = await stripeService.payForOrder(user, orderId);
  res.status(200).json({
    success: true,
    url: session.url
  });
});

// @des    Refund cancelled paid order
// @route  POST api/payments/:id/stripe
// @access private
//export const payWithStripe = asyncHandler(async(req, res) => {});