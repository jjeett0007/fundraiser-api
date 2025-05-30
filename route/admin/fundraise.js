const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const isAdminAuthenticated = require("../../middleware/verifyAdminToken");

const {
  getAllFundRaiseController,
} = require("../../controllerAdmin/fundraiseDb/index");

const {
  adminLoginController,
  adminSignupValidation,
} = require("../../validation/authValid");

router.get("/get-all", getAllFundRaiseController);

module.exports = router;
