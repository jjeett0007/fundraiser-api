const { FundRaise } = require("../../model/index");
const { generateAddress } = require("../generate/generate");

const startFundRaise = async ({ id, fundraiseId }) => {
  try {
    const fundRaise = await FundRaise.findById(fundraiseId);

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
        condition: !fundRaise.verify?.verificationId || fundRaise.verify?.verificationId === null,
        code: 403,
        message: "Verify your Identity for this fundraise."
      },
      {
        condition: fundRaise.verify.isFundRaiseVerified === false,
        code: 403,
        message: "Pending verification"
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

    const getContractAddress = await generateAddress("contract");

    await FundRaise.findByIdAndUpdate(
      fundraiseId,
      {
        contract: getContractAddress.id,
        contractAddress: getContractAddress.address,
        isInitialized: true,
        isFundRaiseStarted: true,
        isFundRaiseEnded: false,
        isFundRaiseActive: true,
        isFundRaisedStartedDate: new Date()
      },
      { new: true }
    );

    return { code: 200, message: "Fundraise started." };
  } catch (error) {
    console.error("Error in startFundRaise:", error);
    return { code: 500, message: "Server error.", error };
  }
};

module.exports = startFundRaise;
