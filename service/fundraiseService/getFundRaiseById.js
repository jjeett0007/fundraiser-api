const { FundRaise } = require("../../model/index");

const getFundRaiseDataById = async ({ id }) => {
  try {
    const fundRaise = await FundRaise.findById(id)
      .populate({
        path: "createdBy",
        select: "profile profileImages"
      })
      .select(
        "fundMetaData isFundRaiseStarted isInitialized isFundRaisedStopped isFundRaiseFundsComplete isFundRaiseFundedCompletely isFundRaisedStartedDate staticsts verify.isFundRaiseVerified verify.isFundRaiseVerifiedDate statics signature fundraiseWithdrawLink"
      );

    if (!fundRaise) {
      return {
        code: 404,
        message: "FundRaise not found"
      };
    }

    return {
      code: 200,
      data: fundRaise
    };
  } catch (error) {
    return { code: 500, message: "Server error.", error };
  }
};

module.exports = getFundRaiseDataById;
