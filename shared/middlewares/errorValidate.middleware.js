const AppError = require("../error/appError");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const grouped = {};

      // grouping
      error.details.forEach((err) => {
        const key = err.context.label;

        if (!grouped[key]) {
          grouped[key] = [];
        }
        if (err.type === "any.custom" && err.context.messages)
          grouped[key].push(...err.context.messages);
        else grouped[key].push(err.message.replaceAll('"', "").toLowerCase());
      });

      const formattedErrors = Object.keys(grouped).map((key) => ({
        label: key,
        messages: grouped[key],
      }));

      return res.status(400).json(formattedErrors);
    }
  next();
  };

};

module.exports = validate;
