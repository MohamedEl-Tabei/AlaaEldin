class AppError extends Error {
  constructor(message, statusCode, label) {
    super(message);
    this.label = label;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
