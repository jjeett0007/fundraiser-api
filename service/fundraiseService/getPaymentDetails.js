const { FundRaiseDonor } = require("../../model/index");

const getPaymentDetails = async ({ donateId }) => {
  try {
    const getDonateInfo = await FundRaiseDonor.findById(donateId).select(
      "_id name email note anonymous fundRaiseId, walletAddress amount"
    );

    if (!getDonateInfo) {
      return {
        code: 404,
        message: "Donation info not found"
      };
    }

    return {
      code: 200,
      data: getDonateInfo
    };
  } catch (error) {
    return error;
  }
};

module.exports = getPaymentDetails;
