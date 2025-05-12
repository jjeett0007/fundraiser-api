const { FundRaise } = require("../../model/index");

const getFundRaiseDataById = async ({ id }) => {
  try {
    const fundRaise = await FundRaise.findById(id).select(
      "fundMetaData isFundRaiseStarted isInitialized isFundRaisedStopped isFundRaiseFundsComplete isFundRaisedStartedDate staticsts verify"
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
