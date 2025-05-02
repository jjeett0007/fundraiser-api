const Joi = require("joi");

const changePasswordValidation = {
  body: Joi.object().keys({
    newPassword: Joi.string()
      .min(8)
      .max(30)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/)
      .required()
      .messages({
        "string.min": "New password must be at least 8 characters long",
        "string.max": "New password must be at most 30 characters long",
        "string.pattern.base":
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
        "any.required": "New password is required"
      }),
    token: Joi.string().required().messages({
      "any.required": "Token is required"
    })
  })
};

const emailOnlyValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required"
    })
  })
};

const passwordChangeValidation = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required().messages({
      "any.required": "Old Password is required"
    }),
    newPassword: Joi.string()
      .min(8)
      .max(30)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/)
      .required()
      .messages({
        "string.min": "New password must be at least 8 characters long",
        "string.max": "New password must be at most 30 characters long",
        "string.pattern.base":
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
        "any.required": "New password is required"
      })
  })
};

module.exports = {
  changePasswordValidation,
  emailOnlyValidation,
  passwordChangeValidation
};
