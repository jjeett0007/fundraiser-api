const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");

//Admin Authentication Middleware
const isAdminAuthenticated = require("../../middleware/verifyAdminToken");

const { emailOnlyValidation } = require("../../validation/globalValidation");

const {
  getWaitlistAllController,
  createWaitListController,
} = require("../../controller/waitList/index");

router.post("/join", validate(emailOnlyValidation), createWaitListController);
router.get("all", isAdminAuthenticated, getWaitlistAllController);

module.exports = router;
