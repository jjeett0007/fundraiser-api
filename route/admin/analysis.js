const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const isAdminAuthenticated = require("../../middleware/verifyAdminToken");

const {
  analysisValidation,
  analysisUpdateValidation
} = require("../../validation/globalValidation");

const {
  getAllAnalysisController,
  getAnalysisByIdController,
  updateAnalysisController
} = require("../../controllerAdmin/analysis/index");

// Get all analysis with optional type filter
router.get("/", isAdminAuthenticated, getAllAnalysisController);

// Get analysis by ID
router.get(
  "/:analysisId",
  isAdminAuthenticated,
  validate(analysisValidation),
  getAnalysisByIdController
);

// Update analysis by ID
router.patch(
  "/:analysisId",
  isAdminAuthenticated,
  validate(analysisValidation),
  validate(analysisUpdateValidation),
  updateAnalysisController
);

module.exports = router;
