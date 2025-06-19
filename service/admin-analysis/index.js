const { Analysis } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getAllAnalysis = async ({ page = 1, limit = 20, type }) => {
  try {
    const filters = {};
    if (type) {
      filters.type = type;
    }
    
    const analyses = await getPaginatedData({
      model: Analysis,
      filters,
      page,
      limit,
      populate: [{
        path: 'createdBy',
        select: 'email profile'
      }]
    });

    return {
      code: 200,
      data: analyses
    };
  } catch (error) {
    return { code: 500, message: "Server error.", error };
  }
};

const getAnalysisById = async (analysisId) => {
  try {
    const analysis = await Analysis.findById(analysisId)
      .populate('createdBy', 'email profile');

    if (!analysis) {
      return {
        code: 404,
        message: "Analysis not found"
      };
    }

    return {
      code: 200,
      data: analysis
    };
  } catch (error) {
    return { code: 500, message: "Server error.", error };
  }
};

const updateAnalysis = async (analysisId, updateData) => {
  try {
    const analysis = await Analysis.findById(analysisId);

    if (!analysis) {
      return {
        code: 404,
        message: "Analysis not found"
      };
    }

    // Update allowed fields
    if (updateData.title) analysis.title = updateData.title;
    if (updateData.description) analysis.description = updateData.description;
    if (updateData.metrics) analysis.metrics = updateData.metrics;
    if (updateData.status) analysis.status = updateData.status;
    analysis.lastUpdated = new Date();

    await analysis.save();

    return {
      code: 200,
      message: "Analysis updated successfully",
      data: analysis
    };
  } catch (error) {
    return { code: 500, message: "Server error.", error };
  }
};

module.exports = {
  getAllAnalysis,
  getAnalysisById,
  updateAnalysis
};
