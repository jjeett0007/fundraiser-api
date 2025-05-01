const { FundRaise } = require("../../model/index");

const startFundRaise = async ({ id, fundRaiseId }) => {
  try {
    const fundRaise = await FundRaise.findOne({ _id: fundRaiseId });

    const errorChecks = [
      {
        condition: !fundRaise,
        code: 404,
        message: "Fundraise not found."
      },
      {
        condition: fundRaise.createdBy.toString() !== id,
        code: 403,
        message: "Unauthorized."
      },
      {
        condition: fundRaise.isFundRaisedStopped,
        code: 400,
        message: "Fundraise already stopped."
      },
      {
        condition: fundRaise.isFundRaiseEnded,
        code: 400,
        message: "Fundraise already ended."
      },
      {
        condition: fundRaise.isFundRaiseStarted,
        code: 400,
        message: "Fundraise already started."
      }
    ];

    const error = errorChecks.find((check) => check.condition);

    if (error) {
      return { code: error.code, message: error.message };
    }

    await FundRaise.findByIdAndUpdate(
      fundRaiseId,
      {
        isFundRaiseStarted: true,
        isFundRaiseEnded: false,
        isFundRaiseActive: true,
        isFundRaisedStartedDate: new Date()
      },
      { new: true }
    );

    return { code: 200, message: "Fundraise started." };
  } catch (error) {
    return { code: 500, message: "Server error.", error };
  }
};

module.exports = startFundRaise;
