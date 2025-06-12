const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const isAdminAuthenticated = require("../../middleware/verifyAdminToken");

const {
  deleteManyUsersByMail,
  validateUserId
} = require("../../validation/globalValidation");

const {
  getAllUserController,
  addToMailSubsController,
  deleteManyUserController,
  getUser
} = require("../../controllerAdmin/userController/index");

router.get("/all", isAdminAuthenticated, getAllUserController);
router.post("/add-to-mail-subs", isAdminAuthenticated, addToMailSubsController);
router.delete(
  "/delete-many",
  isAdminAuthenticated,
  validate(deleteManyUsersByMail),
  deleteManyUserController
);
router.get(
  "/get-user/:userId",
  isAdminAuthenticated,
  validate(validateUserId),
  getUser
);

module.exports = router;
