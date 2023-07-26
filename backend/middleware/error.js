const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'Internal Server Error';

  //wrong mongodb id error
  if (error.name === 'CastError') {
    const message = `Resources not found with this id..  Invalid ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  //Duplicate key Error
  if (error.code === 11000) {
    const message = `Duplicate key ${Object.keys(error.keyValue)} Entered`;
    error = new ErrorHandler(message, 400);
  }

  //wrong jwt Error
  if (error.name === 'JsonWebTokenError') {
    const message = `Your url is Invalid Please try again later`;
    error = new ErrorHandler(message, 400);
  }

  //jwt expired
  if (error.name === 'TokenExpired') {
    const message = `Your Url is expired please try again later`;
    error = new ErrorHandler(message, 400);
  }
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
