const Joi = require("joi");
const { LANGUAGES, PERMISSIONS } = require("../../shared/constants");

//#region Validations
//#region name
const nameValidation = (label) =>
  Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .required()
    .min(3)
    .max(20)
    .messages({
      "string.pattern.base": `${label} must contain letters only`,
    });
//#endregion
//#region email
const emailValidation = Joi.string()
  .required()
  .email()
  .message("invalid email format");
//#endregion
//#region password
const passwordValidation = Joi.string()
  .min(8)
  .max(26)
  .required()
  .custom((value, helpers) => {
    const errors = [];
    if (!/[A-Z]/.test(value))
      errors.push("password must contain at least one uppercase letter");
    if (!/[a-z]/.test(value))
      errors.push("password must contain at least one lowercase letter");
    if (!/[0-9]/.test(value))
      errors.push("password must contain at least one number");
    if (!/[!@#$%^&*]/.test(value))
      errors.push(
        "password must contain at least one special character !@#$%^&*",
      );
    if (errors.length > 0) {
      return helpers.error("any.custom", { messages: errors });
    }

    return value;
  });
//#endregion
//#region confirm password
const confirmPasswordValidation = Joi.string()
  .valid(Joi.ref("password"))
  .required()
  .messages({
    "any.only": "Confirm password must match password",
    "any.required": "Confirm password is required",
  });
//#endregion
//#region phone
//#region egyptian
const egyptianPhoneValidation = Joi.string()
  .required()
  .pattern(/^01[0125][0-9]{8}$/)
  .message("Invalid Egyptian phone number");
//#endregion
//#endregion
//#region id
const idNumberValidation = Joi.string()
  .length(14)
  .required()
  .custom((value, helpers) => {
    const centuryDigit = value[0];
    const year = value.substring(1, 3);
    const month = value.substring(3, 5);
    const day = value.substring(5, 7);
    const message = "Invalid Egyptian ID";
    //  1. Validate century
    let century;
    if (centuryDigit === "2") century = 1900;
    else if (centuryDigit === "3") century = 2000;
    else {
      return helpers.message(message);
    }

    //  2. Build birthdate
    const fullYear = century + parseInt(year, 10);
    const birthDate = new Date(`${fullYear}-${month}-${day}`);

    if (isNaN(birthDate.getTime())) {
      return helpers.message(message);
    }
    return value;
  })
  .messages({
    "string.length": "ID must be exactly 14 digits",
    "any.required": "ID number is required",
  });
//#endregion
//#region languages
const languageValidation = Joi.string()
  .valid(...LANGUAGES.LIST)
  .required()
  .messages({
    "any.only": `Language must be either ${LANGUAGES.AR} or ${LANGUAGES.EN}`,
  });
//#endregion
//#region permission
const permissionValidation = Joi.string()
  .valid(...PERMISSIONS.LIST)
  .required()
  .messages({
    "any.only": `Permission must be either ${PERMISSIONS.MARKETPLACE}, ${PERMISSIONS.REAL_ESTATE}, ${PERMISSIONS.SERVICE} or ${PERMISSIONS.STORES}`,
  });
//#endregion
//#region image
const imageValidation = Joi.allow();
//#endregion
//#region otpCode
const otpCodeValidation = Joi.string()
  .required()
  .length(6)
  .message("Invalid or expired OTP");
//#endregion
//#endregion
const registerSchema = Joi.object({
  firstName: nameValidation("firstName"),
  lastName: nameValidation("lastName"),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
  phone: egyptianPhoneValidation,
  idNumber: idNumberValidation,
  lang: languageValidation,
  permission: permissionValidation,
  idImageBack: imageValidation,
  idImageFront: imageValidation,
  idImageSelfie: imageValidation,
  profileImage: imageValidation,
});
const verifyOTPSchema = Joi.object({
  email: emailValidation,
  otp: otpCodeValidation,
});
const loginSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});
const updateMeSchema = Joi.object({
  firstName: nameValidation("firstName"),
  lastName: nameValidation("lastName"),
  phone: egyptianPhoneValidation,
  lang: languageValidation,
  permission: permissionValidation,
});
module.exports = {
  registerSchema,
  verifyOTPSchema,
  loginSchema,
  updateMeSchema,
};
