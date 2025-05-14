const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");

const isUserAuthenticated = require("../../middleware/verifyUserToken");
const isAccountVerified = require("../../middleware/accountVerified");

const { userInfoValidation } = require("../../validation/globalValidation");
