const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");

const isUserAuthenticated = require("../../middleware/verifyUserToken");

const { otpCodeValidation } = require("../../validation/authValid");

const optResend = require("../../controller/User/resnedOtp");
const verifyOtp = require("../../controller/User/verifyCode");

router.get("/resend", isUserAuthenticated, optResend);
router.post(
  "/verify",
  isUserAuthenticated,
  validate(otpCodeValidation),
  verifyOtp
);

module.exports = router;
