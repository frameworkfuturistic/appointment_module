// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Server Error',
    });
  };
  
  module.exports = errorHandler;
  