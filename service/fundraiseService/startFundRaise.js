const { FundRaise } = require("../../model/index");
const { generateAddress } = require("../generate/generate");
const { fundraiseLive } = require("../mailerService/index");

const startFundRaise = async ({ id, fundraiseId }) => {
  try {
    const fundRaise = await FundRaise.findById(fundraiseId)
      .populate("createdBy", "email profile _id");

    if (!fundRaise) {
      return {
        code: 404,
        message: "Not Found",
      };
    }

    const errorChecks = [
      {
        condition: !fundRaise,
        code: 404,
        message: "Fundraise not found.",
      },
      {
        condition: fundRaise.createdBy._id.toString() !== id,
        code: 403,
        message: "Unauthorized.",
      },
      {
        condition: fundRaise.isInitialized,
        code: 400,
        message: "Fundraise already started.",
      },
      {
        condition: fundRaise.isFundRaisedStopped,
        code: 400,
        message: "Fundraise already stopped.",
      },
      // {
      //   condition:
      //     !fundRaise.verify?.verificationId ||
      //     fundRaise.verify?.verificationId === null,
      //   code: 403,
      //   message: "Verify your Identity for this fundraise.",
      // },
      // {
      //   condition: fundRaise.verify?.isVerificationInitalized === true,
      //   code: 403,
      //   message: "Under Verification",
      // },
      {
        condition: fundRaise.isFundRaiseEnded,
        code: 400,
        message: "Fundraise already ended.",
      },
      {
        condition: fundRaise.isFundRaiseStarted,
        code: 400,
        message: "Fundraise already started.",
      },
    ];

    const error = errorChecks.find((check) => check.condition);

    if (error) {
      return { code: error.code, message: error.message };
    }

    const { createdBy } = fundRaise;


    process.nextTick(async () => {
      const newDate = new Date()

      const getContractAddress = await generateAddress("contract");
      console.log({
        createdBy
      })

      await Promise.all([
        FundRaise.findByIdAndUpdate(
          fundraiseId,
          {
            contract: getContractAddress.id,
            contractAddress: getContractAddress.address,
            isInitialized: true,
            isFundRaiseStarted: true,
            isFundRaiseEnded: false,
            isFundRaiseActive: true,
            isFundRaiseFundsComplete: false,
            isFundRaisedStartedDate: new Date(),
          },
          { new: true }
        ),

        fundraiseLive({
          email: createdBy.email,
          name: `${createdBy.profile.firstName} ${createdBy.profile.lastName}`,
          date: newDate,
          title: fundRaise.fundMetaData.title,
          goalAmount: fundRaise.fundMetaData.goalAmount,
          fundraiseId: fundRaise._id.toString()
        })
      ])
    })



    return { code: 200, message: "Fundraise started." };
  } catch (error) {
    console.error("Error in startFundRaise:", error);
    return { code: 500, message: "Server error.", error };
  }
};

module.exports = startFundRaise;
