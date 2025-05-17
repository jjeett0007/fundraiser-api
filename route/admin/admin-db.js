const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const isAdminAuthenticated = require("../../middleware/verifyAdminToken");

const {
  getAdminController,
  getAllAdminController,
} = require("../../controllerAdmin/authAdmin/index");

const {
  adminLoginController,
  adminSignupValidation,
} = require("../../validation/authValid");

router.get("/view", isAdminAuthenticated, getAdminController);
router.get("/all", isAdminAuthenticated, getAllAdminController);

module.exports = router;