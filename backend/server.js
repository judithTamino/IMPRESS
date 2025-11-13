import express from 'express';
import chalk from 'chalk';

import errorHandler from './middlewares/error.middleware.js';
import logger from './middlewares/logger.middleware.js';

import authRouter from './routes/auth.route.js';
import productRouter from './routes/product.route.js';

import { PORT } from './config/env.js';
import connectToDB from './config/db.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(logger);
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);

// Error middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(chalk.bgGreenBright(`Server is running on http://localhost:${PORT}`));
  connectToDB();
});