const errorMiddleware = (err, _req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    // Mongoose duplicate key
    if (err.code === 11000) {
      error = new Error("Duplicate field value entered");
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      msg: error.message || 'Something went wrong',
      stack: err.stack
    });
    
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;