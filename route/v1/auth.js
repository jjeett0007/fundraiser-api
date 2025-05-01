const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const userCreate = require("../../controller/User/userCreate");
const userLogin = require("../../controller/User/userLogin");

const {
  signupValidation,
  loginvalidatoin,
} = require("../../validation/authValid");

router.post("/sign-up", validate(signupValidation), userCreate);
router.post("/sign-in", validate(loginvalidatoin), userLogin);

module.exports = router;
