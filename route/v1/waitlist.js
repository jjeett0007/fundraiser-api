const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");

const { emailOnlyValidation } = require("../../validation/globalValidation");

const createWaitListController = require("../../controller/waitList/createWaitListController");

router.post("/join", validate(emailOnlyValidation), createWaitListController);

module.exports = router;
