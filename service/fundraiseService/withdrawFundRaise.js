const { FundRaise } = require("../../model/index");

const withdrawFundRaised = async ({ id, fundraiseId }) => {
  try {
    const fundRaise = await FundRaise.findById(fundraiseId).populate(
      "contract",
      "privateKey walletAddress"
    );

    if (!fundRaise) {
      return {
        code: 404,
        message: "Not Found",
      };
    }

    const errorChecks = [
      {
        condition: fundRaise.createdBy.toString() !== id,
        code: 403,
        message: "Unauthorized.",
      },
      {
        condition: !fundRaise.isFundRaiseStarted,
        code: 400,
        message: "Fundraise not started.",
      },
      {
        condition: fundRaise.isFundRaisedStopped,
        code: 400,
        message: "Fundraise already stopped.",
      },
      {
        condition:
          !fundRaise.verify?.verificationId ||
          fundRaise.verify?.verificationId === null,
        code: 403,
        message: "Verify your Identity for this fundraise.",
      },
      {
        condition: fundRaise.verify?.isVerificationInitalized === true,
        code: 403,
        message: "Under Verification",
      },
      {
        condition: fundRaise.isFundRaiseEnded,
        code: 400,
        message: "Fundraise already ended.",
      },
    ];

    const error = errorChecks.find((check) => check.condition);

    if (error) {
      return { code: error.code, message: error.message };
    }

    const { contract, fundMetaData } = fundRaise;
    console.log({ contract, fundMetaData.walletAddress });

    // await FundRaise.findByIdAndUpdate(
    //   fundraiseId,
    //   {
    //     isFundRaiseEnded: true,
    //     isFundRaiseActive: false,
    //     isFundRaisedEndDate: new Date(),
    //     isFundRaiseFunded: true,
    //     isFundRaisedStopped: true,
    //     isFundRaiseFundsComplete: true,
    //   },
    //   { new: true }
    // );

    return {
      code: 200,
      message: "withdraw sent to your wallet",
    };
  } catch (error) {
    return error;
  }
};


module.exports = withdrawFundRaised