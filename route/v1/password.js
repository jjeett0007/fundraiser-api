const express = require("express");
const router = express.Router();
const isUserAuthenticated = require("../../middleware/verifyUserToken");
const isAccountVerified = require("../../middleware/accountVerified");
const validate = require("../../middleware/validate");
const resetPasswordTokenMiddleware = require("../../middleware/resetePasswordMiddleware");

const {
  changePasswordValidation,
  emailOnlyValidation,
  passwordChangeValidation
} = require("../../validation/globalValidation");

const changePasswordController = require("../../controller/password/change-password");
const forgotPasswordController = require("../../controller/password/forgot-password");
const updateUserPassword = require("../../controller/password/update-password");

router.post("/forgot", validate(emailOnlyValidation), forgotPasswordController);

router.patch(
  "/reset",
  validate(changePasswordValidation),
  resetPasswordTokenMiddleware,
  changePasswordController
);

router.put(
  "/update",
  isUserAuthenticated,
  isAccountVerified,
  validate(passwordChangeValidation),
  updateUserPassword
);

module.exports = router;
