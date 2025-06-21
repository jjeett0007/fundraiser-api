const { FundRaise } = require("../../model/index");

const startFundraiseByAdmin = async (fundraiseId) => {
  try {
    const fundraise = await FundRaise.findById(fundraiseId);
    if (!fundraise) {
      return { code: 404, message: "Fundraise not found" };
    }
    fundraise.isFundRaiseStarted = true;
    fundraise.isFundRaiseActive = true;
    fundraise.isFundRaiseDeactivated = false;
    fundraise.isFundRaiseEnded = false;
    fundraise.isFundRaiseEndedByAdmin = false;
    fundraise.isFundRaisedStoppedByAdmin = false;
    fundraise.isFundRaiseWithdrawable = true;
    fundraise.isFundRaiseLive = true;
    fundraise.isFundRaisedStartedDate = new Date();
    await fundraise.save();
    return {
      code: 200,
      message: "Fundraise started successfully"
    };
  } catch (error) {
    return { code: 500, message: "Server error", error };
  }
};

const stopFundraiseByAdmin = async (fundraiseId) => {
  try {
    const fundraise = await FundRaise.findById(fundraiseId);
    if (!fundraise) {
      return { code: 404, message: "Fundraise not found" };
    }
    fundraise.isFundRaiseActive = false;
    fundraise.isFundRaiseActive = false;
    fundraise.isFundRaiseDeactivated = true;
    fundraise.isFundRaiseEnded = true;
    fundraise.isFundRaiseEndedByAdmin = true;
    fundraise.isFundRaisedStoppedByAdmin = true;
    fundraise.isFundRaiseWithdrawable = false;
    fundraise.isFundRaiseLive = false;
    fundraise.isFundRaisedEndDate = new Date();
    await fundraise.save();
    return {
      code: 200,
      message: "Fundraise stopped successfully"
    };
  } catch (error) {
    return { code: 500, message: "Server error", error };
  }
};

const deleteFundraiseByAdmin = async (fundraiseId) => {
  try {
    const fundraise = await FundRaise.findById(fundraiseId);
    if (!fundraise) {
      return { code: 404, message: "Fundraise not found" };
    }
    await FundRaise.deleteOne({ _id: fundraiseId });
    return {
      code: 200,
      message: "Fundraise deleted successfully"
    };
  } catch (error) {
    return { code: 500, message: "Server error", error };
  }
};

module.exports = {
  startFundraiseByAdmin,
  stopFundraiseByAdmin,
  deleteFundraiseByAdmin
};
