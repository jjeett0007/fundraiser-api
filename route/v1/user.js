const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");

const isUserAuthenticated = require("../../middleware/verifyUserToken");
const isAccountVerified = require("../../middleware/accountVerified");

const { userUpdateValidation } = require("../../validation/authValid");

const getUser = require("../../controller/loggedUser/getuser");
const destroyUser = require("../../controller/loggedUser/deleteUser");
const updateUserController = require("../../controller/loggedUser/updateUser");

router.get("/", isUserAuthenticated, isAccountVerified, getUser);
router.patch(
  "/",
  isUserAuthenticated,
  isAccountVerified,
  validate(userUpdateValidation),
  updateUserController
);
router.delete("/", isUserAuthenticated, isAccountVerified, destroyUser);

module.exports = router;
