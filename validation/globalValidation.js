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
        "any.required": "New password is required",
      }),
    token: Joi.string().required().messages({
      "any.required": "Token is required",
    }),
  }),
};

const emailOnlyValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
  }),
};

const passwordChangeValidation = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required().messages({
      "any.required": "Old Password is required",
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
        "any.required": "New password is required",
      }),
  }),
};

const fundraiserValidation = {
  body: Joi.object().keys({
    title: Joi.string().required().min(3).max(100).messages({
      "string.min": "Title must be at least 3 characters long",
      "string.max": "Title must be at most 100 characters long",
      "any.required": "Title is required",
    }),
    description: Joi.string().required().min(10).max(2000).messages({
      "string.min": "Description must be at least 10 characters long",
      "string.max": "Description must be at most 2000 characters long",
      "any.required": "Description is required",
    }),
    goalAmount: Joi.number().required().positive().min(1).messages({
      "number.positive": "Goal amount must be a positive number",
      "number.min": "Goal amount must be at least 1",
      "any.required": "Goal amount is required",
    }),
    category: Joi.string()
      .required()
      .valid(
        "medical",
        "urgent bills",
        "charity",
        "emergency",
        "animal",
        "crisis",
        "family",
        "food",
        "transportation"
      )
      .messages({
        "any.required": "Category is required",
        "any.only":
          "Category must be one of: medical, urgent bills, charity, emergency, animal, crisis, family, food, transportation",
      }),
    walletAddress: Joi.string()
      .required()
      .pattern(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)
      .messages({
        "any.required": "Wallet address is required",
        "string.pattern.base": "Wallet address must be a valid Solana address",
      }),
    imageUrl: Joi.string().uri().allow("").optional().messages({
      "string.uri": "Image URL must be a valid URI",
    }),
    videoUrl: Joi.string().uri().allow("").optional().messages({
      "string.uri": "Video URL must be a valid URI",
    }),
  }),
};

const validateFundraiserId = {
  params: Joi.object().keys({
    fundraiseId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "any.required": "Fundraiser ID is required",
        "string.pattern.base": "Fundraiser ID must be a valid MongoDB ObjectId",
      }),
  }),
};

const validateDonationId = {
  params: Joi.object().keys({
    donateId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "any.required": "Donation ID is required",
        "string.pattern.base": "Donation ID must be a valid MongoDB ObjectId",
      }),
  }),
};

const donationValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(100).messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be at most 100 characters long",
      "any.required": "Name is required",
    }),
    email: Joi.string().required().email().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    amount: Joi.number().required().positive().messages({
      "number.positive": "Amount must be a positive number",
      "any.required": "Amount is required",
    }),
    note: Joi.string().allow("").max(500).optional().messages({
      "string.max": "Note must be at most 500 characters long",
    }),
    anonymous: Joi.boolean().default(false),
  }),
};

const queryValidation = {
  query: Joi.object().keys({
    page: Joi.number().min(1).default(1).messages({
      "number.min": "Page number must be greater than 0",
    }),
    category: Joi.string().optional().messages({
      "string.base": "Category must be a string",
    }),
  }),
};

const userInfoValidation = {
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      "any.required": "Country is required",
    }),
    meansOfVerification: Joi.string().required().messages({
      "any.required": "Means of verification is required",
    }),
    idNumber: Joi.string().required().messages({
      "any.required": "Id number is required",
    }),
    selfie: Joi.string().uri().required().messages({
      "any.required": "Selfie is required",
      "string.uri": "Selfie must be a valid URI",
    }),
    // livenessVideo: Joi.string().uri().required().messages({
    //   "any.required": "Liveness video is required",
    //   "string.uri": "Liveness video must be a valid URI",
    // }),
    documentData: Joi.object({
      frontView: Joi.string().uri().required().messages({
        "any.required": "Front view is required",
        "string.uri": "Front view must be a valid URI",
      }),
      backView: Joi.string().uri().optional().messages({
        "string.uri": "Back view must be a valid URI",
      }),
    })
      .required()
      .messages({
        "any.required": "Document data is required",
        "object.base": "Document data must be an object",
      }),
    mobileNumber: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required()
      .messages({
        "any.required": "Mobile number is required",
        "string.pattern.base": "Mobile number must be a valid E.164 format",
      }),
    fundRaiseProofs: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().required().messages({
            "any.required": "Proof type is required",
          }),
          file: Joi.string().uri().required().messages({
            "any.required": "Proof file is required",
            "string.uri": "Proof file must be a valid URI",
          }),
        })
      )
      .min(1)
      .required()
      .messages({
        "any.required": "At least one fund raise proof is required",
        "array.min": "At least one fund raise proof is required",
      }),
  }),
};

module.exports = {
  changePasswordValidation,
  emailOnlyValidation,
  passwordChangeValidation,
  fundraiserValidation,
  donationValidation,
  queryValidation,
  validateFundraiserId,
  validateDonationId,
  userInfoValidation,
};
