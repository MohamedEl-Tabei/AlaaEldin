const validate = (schema) => {
  return (req, res, next) => {
    const body = req.body;
    const { error } = schema.validate(body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        errors: error.details.map((err) => {
          return { message: err.message, label: err.context.label };
        }),
      });
    }
    next();
  };
};

module.exports = validate;
