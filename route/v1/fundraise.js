const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");

const isUserAuthenticated = require("../../middleware/verifyUserToken");
const isAccountVerified = require("../../middleware/accountVerified");

const {
  fundraiserValidation,
  donationValidation,
  queryValidation,
  validateFundraiserId,
  validateDonationId
} = require("../../validation/globalValidation");

// controllers
const {
  createFundRaiseController,
  fundFundRaiseController,
  getAllFundRaiseController,
  getFundRaiseByIdController,
  getPaymentInfoController,
  startFundRaiseController,
  getMyFundRaise
} = require("../../controller/fundRaiseController/index");

router.post(
  "/create",
  isUserAuthenticated,
  isAccountVerified,
  validate(fundraiserValidation),
  createFundRaiseController
);

router.get(
  "/get",
  isUserAuthenticated,
  isAccountVerified,
  getMyFundRaise
);

router.post(
  "/start-fundraise/:fundraiseId",
  isUserAuthenticated,
  isAccountVerified,
  validate(validateFundraiserId),
  startFundRaiseController
);

router.get(
  "/get-fundraise",
  validate(queryValidation),
  getAllFundRaiseController
);

router.get(
  "/get-fundraise/:fundraiseId",
  validate(validateFundraiserId),
  validate(queryValidation),
  getFundRaiseByIdController
);

router.post(
  "/donate/:fundraiseId",
  validate(validateFundraiserId),
  validate(donationValidation),
  fundFundRaiseController
);

router.get(
  "/donate/info/:donateId",
  validate(validateDonationId),
  getPaymentInfoController
);

module.exports = router;
