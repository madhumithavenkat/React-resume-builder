const AppError = require('../utils/appError');



const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 403);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
      error: err
    });
  }
};






module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode | 500;
    err.status = err.status | 'error';

    if (process.env.NODE_ENV === 'development') {
      let error = { ...err };
      if (error.name === 'TokenExpiredError') {
        error = handleJWTExpiredError();
      }
      sendErrorDev(error, res);
     
      } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
    
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError')
          error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    
        sendErrorProd(error, res);
      }
}