const { FundRaise } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getAllFundRaises = async ({ page = 1, category, createdBy }) => {
  const filter = {};

  if (!createdBy) {
    filter.isInitialized = true;
    filter.isFundRaiseStarted = true;
    filter.isFundRaiseActive = true;
    filter.isFundRaiseEnded = false;
    filter.isFundRaiseFunded = false;
    filter.isFundRaiseDeactivated = false;
    filter.isFundRaisedStopped = false;
    filter.isFundRaiseFundsComplete = false;
    filter.isFundRaisedStoppedByAdmin = false;
    filter.isFundRaiseLive = true;
    filter.isFundRaiseWithdrawable = true;
    filter.isFundRaiseWithdrawn = false;
    filter.isFundRaiseEndedByAdmin = false;
    filter["verify.isFundRaiseVerified"] = false;
  }

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
        "isFundRaiseFunded",
        "isFundRaiseDeleted",
        "isFundRaiseFundsComplete",
        "isFundRaiseFundedCompletely",
        "isFundRaisedEndDate",
        "isFundRaiseWithdrawable",
        "isFundRaiseWithdrawn",
        "isFundRaisedStoppedByAdmin",
        "isFundRaiseEndedByAdmin",
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
        "signature",
        "fundraiseWithdrawLink"
      ]
    });

    return fundRaises;
  } catch (error) {
    return error;
  }
};

module.exports = getAllFundRaises;
