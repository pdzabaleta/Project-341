// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    // Customize the error response as needed
    res.status(err.statusCode || 500).json({
      error: err.message || 'Internal Server Error',
    });
  };
  
  module.exports = errorHandler;
  