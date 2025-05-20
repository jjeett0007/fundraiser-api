const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const isAdminAuthenticated = require("../../middleware/verifyAdminToken");

const {
  getAdminController,
  getAllAdminController,
  updateAdminController,
} = require("../../controllerAdmin/authAdmin/index");

const { userUpdateValidation } = require("../../validation/authValid");

router.get("/view", isAdminAuthenticated, getAdminController);
router.get("/all", isAdminAuthenticated, getAllAdminController);
router.patch(
  "/update",
  isAdminAuthenticated,
  validate(userUpdateValidation),
  updateAdminController
);

module.exports = router;
