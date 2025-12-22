import { stripe } from '../config/stripe.js';
import { FRONTEND_URL } from '../config/env.js';

import Order from '../models/order.model.js';
import { CustomError } from '../utils/error.utils.js';

export const createCheckoutSession = async (order, user) => {
  console.log(order._id);

  const lineItems = order.items.map(item => ({
    price_data: {
      currency: 'ils',
      product_data: {
        name: item.name
      },
      unit_amount: item.price * 100
    },
    quantity: item.quantity
  }));

  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: lineItems,

    metadata: {
      orderId: String(order._id),
      userId: String(user._id) 
    },

    success_url: `${FRONTEND_URL}/success`,
    cancel_url: `${FRONTEND_URL}/cancel`
  });
}

export const payForOrder = async (user, orderId) => {
  const order = await Order.findById(orderId);
  
  if (!order)
    throw new CustomError('Order not found.', 404);

  if (order.paymentStatus === 'paid')
    throw new CustomError('Order already paid.', 400);

  const session = await createCheckoutSession(order, user);
  order.stripSessionId = session.id;
  await order.save();

  return session;
};
