const { FundRaise } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getAllFundRaises = async ({ page = 1, category }) => {
  const filter = {
    isInitialized: true,
    isFundRaiseStarted: true,
    isFundRaiseEnded: false,
    isFundRaiseActive: true,
    isFundRaisedStopped: false
  };

  if (category) {
    filter["fundMetaData.category"] = category;
  }

  try {
    const fundRaises = await getPaginatedData({
      model: FundRaise,
      filters: filter,
      page,
      limit: 9,
      includeUser: false,
      exclude: [
        "createdBy",
        "contract",
        "isFundRaiseStarted",
        "isFundRaiseEnded",
        "isFundRaiseActive",
        "isFundRaiseFunded",
        "isFundRaisedStopped",
        "isFundRaiseDeleted",
        "isFundRaiseFundsComplete",
        "isFundRaiseFundedCompletely",
        "isFundRaisedEndDate",
        "isTotalFundCounts",
        "reportCount",
        "isDeleted",
        "isFundRaiseVerified",
        "isFundRaiseVerifiedDate",
        "isFundRaiseVerifiedBy",
        "isFundRaiseVerifiedComment",
        "isFundRaiseVerifiedStatus",
        "isFundRaiseDeactivated",
        "createdAt",
        "updatedAt",
        "__v",
        "fundMetaData.walletAddress",
        "fundMetaData.videoUrl"
      ]
    });

    return fundRaises;
  } catch (error) {
    return { code: 500, message: "Server error.", error };
  }
};

module.exports = getAllFundRaises;
