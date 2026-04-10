const Joi = require("joi");
const starsValidation = Joi.number().required().min(1).max(5);
const feedbackValidation = Joi.string().required().max(500);
const detailsValidation = Joi.string().max(1000);
const addToUserSchema = Joi.object({
  stars: starsValidation,
  feedback: feedbackValidation,
  details: detailsValidation,
});

module.exports = {
  addToUserSchema,
};
