const {
  getAllAnalysis,
  getAnalysisById,
  updateAnalysis
} = require("../../service/admin-analysis/index");

const getAllAnalysisController = catchAsync(async (req, res) => {
  const { page, type } = req.query;
  try {
    const { code, message, data } = await getAllAnalysis({
      page,
      type
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    handleResponse(
      res,
      500,
      "Internal Server Error, Contact Dev team",
      undefined
    );
  }
});

const getAnalysisByIdController = catchAsync(async (req, res) => {
  const { analysisId } = req.params;
  try {
    const { code, message, data } = await getAnalysisById(analysisId);

    handleResponse(res, code, message, data);
  } catch (error) {
    handleResponse(
      res,
      500,
      "Internal Server Error, Contact Dev team",
      undefined
    );
  }
});

const updateAnalysisController = catchAsync(async (req, res) => {
  const { analysisId } = req.params;
  const updateData = req.body;
  try {
    const { code, message, data } = await updateAnalysis(analysisId, updateData);

    handleResponse(res, code, message, data);
  } catch (error) {
    handleResponse(
      res,
      500,
      "Internal Server Error, Contact Dev team",
      undefined
    );
  }
});

module.exports = {
  getAllAnalysisController,
  getAnalysisByIdController,
  updateAnalysisController
};
