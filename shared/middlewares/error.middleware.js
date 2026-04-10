const { STATUS_CODES } = require("../constants");
const AppError = require("../error/appError");

const errorMiddlware = (err, req, res, next) => {
  console.log("Error: ", err);
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
  if (err.code === 11000 || (err.codeName && err.codeName === "DuplicateKey")) {
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
  if (err.errors)
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ message: err.errors[Object.keys(err.errors)[0]].message });
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
