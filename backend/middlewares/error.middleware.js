import Joi from 'joi';
import { ENV } from '../config/env.js';

export const errorHandler = (error, _req, res, next) => {

  const statusCode = error.statusCode || 500;
  const isDev = ENV === 'development';

  const response = {
    success: false,
    status: statusCode,
    message: error.message || 'Something went wrong',
    errors: null,
    ...(isDev && { stack: error.stack })
  }

  // JOI VALIDATION ERRORS
  if (Joi.isError(error)) {
    response.status = 422;
    response.message = 'Validation error.';
    response.errors = error.details.map(detail => ({
      field: detail.context.key,
      msg: detail.message
    }))

    return res.status(422).json(response);
  }

  // MONGOOSE DUPLICATE KEY ERROR
  if (error.code === 1100) {
    response.status = 400;
    response.message = 'Duplicate field value.';
    response.errors = Object.keys(error.keyValue).map(field => ({
      field,
      msg: `Duplicate value for field '${field}`
    }));

    return res.status(400).json(response);
  }

  // CUSTOM API ERROR
  if (error.statusCode)
    return res.status(error.statusCode).json(response);

  // DEFAULT / UNEXPECTED ERRORS
  return res.status(statusCode).json(response);
};

export const notFound = (_req, _res, next) => {
  const error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
}
