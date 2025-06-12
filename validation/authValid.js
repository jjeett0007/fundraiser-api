const Joi = require("joi");
const disposableMail = require("../utils/disposableMailList");

const signupValidation = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        const domain = value.split("@")[1];
        if (disposableMail.includes(domain)) {
          return helpers.message("Disposable emails are not allowed");
        }
        return value;
      }),
    password: Joi.string().required(),
    profileName: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required()
    })
  })
};

const loginvalidatoin = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        const domain = value.split("@")[1];
        if (disposableMail.includes(domain)) {
          return helpers.message("Disposable emails are not allowed");
        }
        return value;
      }),
    password: Joi.string().required()
  })
};

const otpCodeValidation = {
  body: Joi.object().keys({
    otpCode: Joi.number().required()
  })
};

const userUpdateValidation = {
  body: Joi.object()
    .keys({
      profileInfo: Joi.object().keys({
        firstName: Joi.string(),
        lastName: Joi.string(),
        displayName: Joi.string(),
        phoneNumber: Joi.string()
      }),
      avatar: Joi.string(),
      address: Joi.object().keys({
        country: Joi.string(),
        state: Joi.string(),
        city: Joi.string()
      })
    })
    .min(1)
};

const adminSignupValidation = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    role: Joi.string().valid("admin", "superAdmin", "admin").required()
  })
};

const adminLoginController = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

module.exports = {
  signupValidation,
  loginvalidatoin,
  otpCodeValidation,
  userUpdateValidation,
  adminLoginController,
  adminSignupValidation
};
