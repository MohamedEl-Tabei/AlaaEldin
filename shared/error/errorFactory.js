const { STATUS_CODES } = require("../constants");
const AppError = require("./appError");

const errorFactory = {
  badRequest: (msg = "Bad Request", label = null) => {
    throw new AppError(msg, STATUS_CODES.BAD_REQUEST, label);
  },

  unauthorized: (msg = "Unauthorized", label = null) => {
    throw new AppError(msg, STATUS_CODES.UNAUTHORIZED, label);
  },

  forbidden: (msg = "Forbidden", label = null) => {
    throw new AppError(msg, STATUS_CODES.FORBIDDEN, label);
  },

  notFound: (msg = "Not Found", label = null) => {
    throw new AppError(msg, STATUS_CODES.NOT_FOUND, label);
  },

  conflict: (msg = "Conflict", label = null) => {
    throw new AppError(msg, STATUS_CODES.CONFLICT, label);
  },

  unprocessable: (msg = "Unprocessable Entity", label = null) => {
    throw new AppError(msg, STATUS_CODES.UNPROCESSABLE_ENTITY, label);
  },

  internal: (msg = "Internal Server Error", label = null) => {
    throw new AppError(msg, STATUS_CODES.INTERNAL_SERVER_ERROR, label);
  },
};

module.exports = errorFactory;