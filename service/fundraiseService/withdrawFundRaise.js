const { FundRaise, User } = require("../../model/index");
const { transferToken } = require("../../lib/solana-block-service");
const {
  fundraiseWithdrawalMail,
  withDrawalFailed
} = require("../mailerService/index");

const withdrawFundRaised = async ({ id, fundraiseId }) => {
  try {
    const fundRaise = await FundRaise.findById(fundraiseId)
      .populate("contract", "privateKey walletAddress")
      .populate("createdBy", "email profile _id");

    if (!fundRaise) {
      return {
        code: 404,
        message: "Not Found"
      };
    }

    const errorChecks = [
      {
        condition: fundRaise.createdBy._id.toString() !== id,
        code: 403,
        message: "Unauthorized."
      },
      {
        condition: !fundRaise.isFundRaiseStarted,
        code: 400,
        message: "Fundraise not started."
      },
      {
        condition: fundRaise.isFundRaisedStoppedByAdmin,
        code: 400,
        message: "Fundraise stopped by Admin, suspected fraud"
      },
      {
        condition: fundRaise.isFundRaiseEndedByAdmin,
        code: 400,
        message: "Fundraise stopped by Admin, suspected fraud"
      },
      {
        condition: fundRaise.isFundRaiseFundsComplete,
        code: 400,
        message: "Fundraise already completed."
      },
      {
        condition: !fundRaise.isFundRaiseWithdrawable,
        code: 400,
        message: "Fundraise is not withdrawable at the moment"
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
        message: "Fundraise already ended."
      }
    ];

    const error = errorChecks.find((check) => check.condition);

    if (error) {
      return { code: error.code, message: error.message };
    }

    const { contract, fundMetaData, statics, createdBy } = fundRaise;
    // console.log({ contract, fundMetaData, statics });

    process.nextTick(async () => {
      const fundPayout94Percent = statics.totalRaised * 0.94;
      const platformFee1Percent = statics.totalRaised * 0.008;
      const platformFee5Percent = statics.totalRaised * 0.05;

      const sendTokenToContract = await transferToken({
        sourceKey: contract.privateKey,
        destinationAddress: fundMetaData.walletAddress,
        amount: parseFloat(fundPayout94Percent.toFixed(2)),
        destinationAddressTwo: "9oyy3CwguMz5qiybc6pYbGgF9L5T6xLnfVrRg59evnzp",
        destinationTwoAmount: parseFloat(platformFee1Percent.toFixed(2)),
        destinationAddressThree: "8hhWAiUiHzTqtSkMJ4AJz3kowr3GW2cUH3tUz4VJFraq",
        destinationThreeAmount: parseFloat(platformFee5Percent.toFixed(2))
      });

      const { success, typeLabel, data } = sendTokenToContract;

      if (success === true) {
        const newDate = new Date();

        await Promise.all([
          FundRaise.findByIdAndUpdate(
            fundraiseId,
            {
              isFundRaiseEnded: true,
              isFundRaiseActive: false,
              isFundRaisedEndDate: newDate,
              isFundRaiseFunded: true,
              isFundRaisedStopped: true,
              isFundRaiseWithdrawn: true,
              isFundRaiseFundsComplete: true,
              isFundRaiseFundedCompletely: true,
              signature: data.signature,
              fundraiseWithdrawLink: data.explorerLink
            },
            { new: true }
          ),
          User.findByIdAndUpdate(createdBy._id.toString(), {
            $inc: { "statics.totalFundReceived": statics.totalRaised }
          }),
          fundraiseWithdrawalMail({
            email: createdBy.email,
            name: `${createdBy.profile.firstName} ${createdBy.profile.lastName}`,
            date: newDate,
            amount: statics.totalRaised,
            signature: data.signature,
            link: data.explorerLink
          })
        ]);
      }

      if (success === false && typeLabel === "InsufficientBalance") {
        const newDate = new Date();
        await withDrawalFailed({
          email: createdBy.email,
          name: `${createdBy.profile.firstName} ${createdBy.profile.lastName}`,
          date: newDate,
          title: fundMetaData.title,
          requestBalance: statics.totalRaised,
          availableBalance: data.sourceBalance,
          id: fundraiseId
        });
      }

      console.log("complete process");
    });

    return {
      code: 200,
      message: "withdrawal in process"
    };
  } catch (error) {
    return error;
  }
};

module.exports = withdrawFundRaised;
