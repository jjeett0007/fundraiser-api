const { FundRaise } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getAllFundRaises = async ({ page = 1, category, createdBy }) => {
  const filter = {};

  if (createdBy) {
    filter.createdBy = createdBy;
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
        "verify.declinedComment",
        "createdAt",
        "updatedAt",
        "__v",
        "fundMetaData.walletAddress",
        "fundMetaData.videoUrl",
        "staticsts.averageDonation",
        "staticsts.largestAmount",
        "isTotalFundCounts",
        "isFundRaiseVerified",
        "isFundRaiseVerifiedBy",
        "isFundRaiseVerifiedComment",
        "isFundRaiseVerifiedStatus",
        "isFundRaiseVerifiedDate",
        "isInitialized",
        "isTotalDonor",
        "reportCount",
      ],
    });

    return fundRaises;
  } catch (error) {
    return error;
  }
};

module.exports = getAllFundRaises;
