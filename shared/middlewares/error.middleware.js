const AppError = require("../error/appError");

const errorMiddlware = (err, req, res, next) => {
  console.log("Error: ", err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      errors: [
        {
          message: err.message,
          label: err.label,
        },
      ],
    });
  }

  res.status(500).json(err);
};

module.exports = errorMiddlware;
