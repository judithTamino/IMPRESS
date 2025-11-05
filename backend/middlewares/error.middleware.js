const errorMiddleware = (err, _req, res, next) => {
  try {
    const statusCode = err.statusCode ? err.statusCode : 500;

    const errorTitles = {
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      500: "Server Error",
    };

    if (err.code === 11000) {
      const error = new Error("Duplicate field value entered");
      error.statusCode = 400;
    }

    res.status(statusCode).json({ title: errorTitles[statusCode] || "Unknown Error", msg: err.message, stack: err.stack });

  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;