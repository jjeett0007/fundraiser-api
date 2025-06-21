const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const isAdminAuthenticated = require("../../middleware/verifyAdminToken");

const {
  startFundraiseController,
  stopFundraiseController,
  deleteFundraiseController
} = require("../../controllerAdmin/fundraiseDb/startStopFundraise");

const {
  getAllFundRaiseController
} = require("../../controllerAdmin/fundraiseDb/index");

router.get("/get-all", isAdminAuthenticated, getAllFundRaiseController);
router.patch(
  "/start/:fundraiseId",
  isAdminAuthenticated,
  startFundraiseController
);
router.patch(
  "/stop/:fundraiseId",
  isAdminAuthenticated,
  stopFundraiseController
);

router.delete(
  "/delete/:fundraiseId",
  isAdminAuthenticated,
  deleteFundraiseController
);

module.exports = router;
