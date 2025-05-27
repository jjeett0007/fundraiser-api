const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const isAdminAuthenticated = require("../../middleware/verifyAdminToken");

const { getStaticsController } = require("../../controllerAdmin/statics/index");

router.get("/", getStaticsController);

module.exports = router;
