const createFundRaiseController = require("./createFundRaise");
const fundFundRaiseController = require("./fundFundRaiseController");
const getAllFundRaiseController = require("./getAllFundRaiseController");
const getFundRaiseByIdController = require("./getFundRaiseData");
const getPaymentInfoController = require("./getPaymentFundInfoController");
const startFundRaiseController = require("./startFundRaise");
const getMyFundRaise = require("./getMyFundRaiseController");
const verifyFundRaiseController = require("./verifyFundRaiseController");
const getAllDonationsController = require("./getAllDonation");

module.exports = {
  createFundRaiseController,
  fundFundRaiseController,
  getAllFundRaiseController,
  getFundRaiseByIdController,
  getPaymentInfoController,
  startFundRaiseController,
  getMyFundRaise,
  verifyFundRaiseController,
  getAllDonationsController,
};
