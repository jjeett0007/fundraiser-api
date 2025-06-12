const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const isAdminAuthenticated = require("../../middleware/verifyAdminToken");

const { deleteManyUsersByMail } = require("../../validation/globalValidation");

const {
  getAllUserController,
  addToMailSubsController,
  deleteManyUserController
} = require("../../controllerAdmin/userController/index");

router.get("/all", isAdminAuthenticated, getAllUserController);
router.post("/add-to-mail-subs", isAdminAuthenticated, addToMailSubsController);
router.delete(
  "/delete-many",
  isAdminAuthenticated,
  validate(deleteManyUsersByMail),
  deleteManyUserController
);

module.exports = router;
