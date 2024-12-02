class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (error, req, res, next) => {
  console.log("this is error", error);
  error.message = error.message || "Internal Server Error";
  error.statusCode = error.statusCode || 500;

  // Handling Multer file upload errors
    if (error.code === 'LIMIT_FILE_SIZE') {
      // Handle file size exceeding limit
      error.message = `File size exceeds the allowed limit. Please make sure your file size should be under 100kb.`;
      error.statusCode = 400;
    } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      // Handle unexpected file type
      error.message = 'Unexpected file type. Only image files are allowed.';
      error.statusCode = 400;

    }

  if (error.name === "CastError") {
    const message = `Resource not found with ID ${error.value}`;
    error = new ErrorHandler(message, 400);
  } else if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((val) => val.message);
    error = new ErrorHandler(messages.join(". "), 400);
  } else if (error.code && error.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorHandler(message, 400);
  } else if (error.name === "JsonWebTokenError") {
    const message = "Invalid token. Please log in again!";
    error = new ErrorHandler(message, 401);
  } else if (error.name === "TokenExpiredError") {
    const message = "Your token has expired! Please log in again.";
    error = new ErrorHandler(message, 401);
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default ErrorHandler;
