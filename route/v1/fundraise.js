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
  validateDonationId,
  userInfoValidation,
} = require("../../validation/globalValidation");

// controllers
const {
  createFundRaiseController,
  fundFundRaiseController,
  getAllFundRaiseController,
  getFundRaiseByIdController,
  getPaymentInfoController,
  startFundRaiseController,
  getMyFundRaise,
  verifyFundRaiseController,
  getAllDonationsController,
  deleteFundRaiseController,
  withdrawFundsController,
  paymentMadeController,
} = require("../../controller/fundRaiseController/index");

router.post(
  "/create",
  isUserAuthenticated,
  isAccountVerified,
  validate(fundraiserValidation),
  createFundRaiseController
);

router.post(
  "/verify/:fundraiseId",
  isUserAuthenticated,
  isAccountVerified,
  validate(validateFundraiserId),
  validate(userInfoValidation),
  verifyFundRaiseController
);

router.post(
  "/withdraw/:fundraiseId",
  isUserAuthenticated,
  isAccountVerified,
  validate(validateFundraiserId),
  withdrawFundsController
);

router.delete(
  "/delete/:fundraiseId",
  isUserAuthenticated,
  isAccountVerified,
  validate(validateFundraiserId),
  deleteFundRaiseController
);

router.get("/get", isUserAuthenticated, isAccountVerified, getMyFundRaise);

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
  "/donate/:fundraiseId",
  validate(validateFundraiserId),
  getAllDonationsController
);

router.get(
  "/donate/info/:donateId",
  validate(validateDonationId),
  getPaymentInfoController
);

router.get(
  "/donate/check/:donateId",
  validate(validateDonationId),
  paymentMadeController
);

module.exports = router;
