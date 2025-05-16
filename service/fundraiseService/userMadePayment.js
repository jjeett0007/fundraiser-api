const { FundRaiseDonor } = require("../../model/index");
const { getATokenAccounts } = require("../../lib/getTokenAccounts");

const userMadePayment = async ({ donateId }) => {
  try {
    const getDonateInfo = await FundRaiseDonor.findById(donateId).select(
      "_id name email note anonymous fundRaiseId, walletAddress amount isFundPaid"
    );

    if (!getDonateInfo) {
      return {
        code: 404,
        message: "Not Found",
      };
    }

    if (getDonateInfo.isFundPaid) {
      return {
        code: 200,
        message: "Payment completed",
      };
    }

    const tokensFound = await getATokenAccounts(getDonateInfo.walletAddress);

    if (tokensFound.data === 404) {
      return {
        code: 404,
        message: "payment not received, try again",
      };
    }

    console.log(tokensFound);

    return {
      code: 200,
      data: tokensFound.data,
      message: "Thanks for your payment",
    };
  } catch (error) {
    return error;
  }
};

module.exports = userMadePayment;
