const { STATUS_CODES } = require("../constants");
const AppError = require("../error/appError");

const errorMiddlware = (err, req, res, next) => {
  console.log("Error: ", err.message);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      errors: [
        {
          messages: [err.message],
          label: err.label,
        },
      ],
    });
  }
  if (err.codeName && err.codeName === "DuplicateKey") {
    const label = Object.keys(err.keyValue)[0];
    return res.status(STATUS_CODES.CONFLICT).json({
      errors: [
        {
          messages: [`${label} is used`],
          label,
        },
      ],
    });
  }
  res.status(500).json({
    errors: [
      {
        messages: "internal server error",
        label: null,
      },
    ],
  });
};

module.exports = errorMiddlware;
