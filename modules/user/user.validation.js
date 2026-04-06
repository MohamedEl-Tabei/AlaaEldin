const Joi = require("joi");
const { LANGUAGES, PERMISSIONS } = require("../../shared/constants");

//#region Validations
const nameValidation = Joi.string().alphanum().min(3).max(20).required();
const emailValidation = Joi.string().required().email();
const passwordValidation = Joi.string()
  .required()
  .min(8)
  .max(26)
  .custom((value, helpers) => {
    if (!/[A-Z]/.test(value)) {
      return helpers.message(
        "Password must contain at least one uppercase letter",
      );
    }

    if (!/[a-z]/.test(value)) {
      return helpers.message(
        "Password must contain at least one lowercase letter",
      );
    }

    if (!/[0-9]/.test(value)) {
      return helpers.message("Password must contain at least one number");
    }
    if (!/[!@#$%^&*]/.test(value)) {
      return helpers.message(
        "Password must contain at least one special character",
      );
    }
    return value;
  });
const confirmPasswordValidation = Joi.valid(Joi.ref("password")).required();
const egyptianPhoneValidation = Joi.string()
  .required()
  .custom((value, helpers) => {
    const regex = /^01[0125][0-9]{8}$/;

    if (!regex.test(value)) {
      return helpers.message("Invalid Egyptian phone number");
    }

    return value;
  });
const idNumberValidation = Joi.string()
  .length(14)
  .pattern(/^[0-9]+$/)
  .required()
  .messages({
    "string.length": "ID must be exactly 14 digits",
    "string.pattern.base": "ID must contain numbers only",
  });
const languageValidation = Joi.string()
  .valid(...LANGUAGES.LIST)
  .required()
  .messages({
    "any.only": `Language must be either ${LANGUAGES.AR} or ${LANGUAGES.EN}`,
  });
const permissionValidation = Joi.string()
  .valid(...PERMISSIONS.LIST)
  .required()
  .messages({
    "any.only": `Permission must be either ${PERMISSIONS.MARKETPLACE}, ${PERMISSIONS.REAL_ESTATE}, ${PERMISSIONS.SERVICE} or ${PERMISSIONS.STORES}`,
  });
const idImageValidation = Joi.string().required();
//#endregion
const registerSchema = Joi.object({
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
  phone: egyptianPhoneValidation,
  idNumber: idNumberValidation,
  lang: languageValidation,
  permission: permissionValidation,
  idImageBack: idImageValidation,
  idImageFront: idImageValidation,
  idImageSelfie: idImageValidation,
  profileImage:Joi.string(),
});

module.exports = {
  registerSchema,
};
