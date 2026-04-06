const { STATUS_CODES } = require("../constants");
const AppError = require("./appError");
const errorFactory = {
  badRequest: (msg = "Bad Request", labelName) => {
    throw new AppError(msg, labelName, STATUS_CODES.BAD_REQUEST);
  },
};

module.exports = errorFactory;
