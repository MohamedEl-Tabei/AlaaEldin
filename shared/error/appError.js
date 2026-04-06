class AppError extends Error {
  constructor(message, label,statusCode = 500) {
    super(message);
    this.label=label
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;