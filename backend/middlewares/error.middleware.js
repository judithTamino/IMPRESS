import Joi from 'joi';
import { ENV } from '../config/env.js';

export const errorHandler = (error, _req, res, next) => {
  console.log(error.statusCode)

  let statusCode = error.statusCode || 500;
  const isDev = ENV === 'development';

  const response = {
    success: false,
    status: statusCode,
    message: error.message || 'Something went wrong',
    errors: [],
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
  console.log(error.code)
  if (error.code === 11000) statusCode = 400;

  // CUSTOM API ERROR
  if (error.statusCode)
    return res.status(error.statusCode).json(response);

  // DEFAULT / UNEXPECTED ERRORS
  return res.status(statusCode).json(response);
};

// export const notFound = (_req, _res, next) => {
//   const error = new Error('Not Found');
//   error.statusCode = 404;
//   next(error);
// }
