const { FundRaise } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getAllFundRaises = async ({ page = 1, category, createdBy }) => {
  const filter = {
    isInitialized: true,
    isFundRaiseStarted: true,
    isFundRaiseEnded: false,
    isFundRaiseActive: true,
    isFundRaisedStopped: false,
    isFundRaiseDeactivated: false,
    "verify.isFundRaiseVerified": false,
  };

  if (createdBy) {
    filter.createdBy = createdBy
  }

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
        "contractAddress",
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
        "isDeleted",
        "verify.verificationId",
        "verify.isFundRaiseVerifiedDate",
        "verify.isFundRaiseVerifiedBy",
        "verify.isFundRaiseVerifiedComment",
        "verify.isFundRaiseVerifiedStatus",
        "isFundRaiseDeactivated",
        "createdAt",
        "updatedAt",
        "__v",
        "fundMetaData.walletAddress",
        "fundMetaData.videoUrl",
        "staticsts.averageDonation",
        "staticsts.largestAmount",
      ]
    });

    return fundRaises;
  } catch (error) {
    return { code: 500, message: "Server error.", error };
  }
};

module.exports = getAllFundRaises;
