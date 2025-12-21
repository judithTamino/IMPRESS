import express from 'express';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middlewares/error.middleware.js';
import logger from './middlewares/logger.middleware.js';
import cors from './middlewares/cors.middleware.js';

import authRouter from './routes/auth.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';

import { PORT } from './config/env.js';
import connectToDB from './config/db.js';
import { connectCloudniray } from './config/cloudinary.js';

const app = express();
const port = PORT || 4000;

await connectCloudniray();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);
app.use(cors);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

// Error middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(chalk.bgGreenBright(`Server is running on http://localhost:${port}`));
  connectToDB();
});