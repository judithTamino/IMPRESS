import Joi from 'joi';

const errorHandler = (err, _req, res, next) => {
  try {
    let error = { ...err, message: err.message };
   //error.message = err.message;

    // Mongoose duplicate key
    if (err.code === 11000) error.statusCode = 400;

    if (Joi.isError(err)) {
      const validationError = {
        msg: 'Validation error',
        errors: error.details.map(item => ({ msg: item.message })),
        stack: error.stack
      }
      return res.status(422).json(validationError);
    }

    res.status(error.statusCode || 500).json({
      msg: error.message || 'Something went wrong',
      stack: error.stack
    });

  } catch (error) {
    next(error);
  }
};

export default errorHandler;