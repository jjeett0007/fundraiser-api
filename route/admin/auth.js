const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");

const {
  createAdminController,
  loginAdminController,
  getAdminController,
  getAllAdminController
} = require("../../controllerAdmin/authAdmin/index");

const {
  adminLoginController,
  adminSignupValidation,
} = require("../../validation/authValid");

router.post("/sign-up", validate(adminSignupValidation), createAdminController);
router.post("/sign-in", validate(adminLoginController), loginAdminController);


module.exports = router;