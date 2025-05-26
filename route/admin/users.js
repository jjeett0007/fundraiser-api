const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const isAdminAuthenticated = require("../../middleware/verifyAdminToken");

const {
  getAllUserController,
} = require("../../controllerAdmin/userController/index");

router.get("/all", isAdminAuthenticated, getAllUserController);

module.exports = router;
