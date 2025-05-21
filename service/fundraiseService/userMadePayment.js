const {
  FundRaiseDonor,
  WalletAddress,
  FundRaise,
} = require("../../model/index");
const { getATokenAccounts } = require("../../lib/getTokenAccounts");
const { transferToken } = require("../../lib/solana-block-service");
const {
  donationUserMail,
  donationCreatorNotify,
} = require("../mailerService/index");

const userMadePayment = async ({ donateId }) => {
  try {
    const getDonateInfo = await FundRaiseDonor.findById(donateId)
      .select(
        "_id name email note anonymous fundRaiseId walletAddress amount isFundPaid currentAmount walletInfo"
      )
      .populate("walletInfo", "privateKey walletAddress")
      .populate({
        path: "fundRaiseId",
        select: "_id contractAddress createdBy fundMetaData statics",
        populate: { path: "createdBy", select: "email profile" },
      });

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

    const { privateKey, walletAddress } = getDonateInfo.walletInfo;
    const { _id, contractAddress, fundMetaData, createdBy, statics } =
      getDonateInfo.fundRaiseId;

    // Extract tokenAmount from tokensFound
    const tokenAmount = tokensFound.data.account.data.parsed.info.tokenAmount;

    // Convert amount string to number and adjust for decimals
    const newCurrentAmount =
      Number(getDonateInfo.currentAmount) + Number(tokenAmount.uiAmount);

    console.log(newCurrentAmount);

    if (tokenAmount.uiAmount === 0) {
      return {
        code: 404,
        message: "payment not received, try again",
      };
    }

    process.nextTick(async () => {
      const fundPayout99Percent = tokenAmount.uiAmount * 0.98;
      const platformFee1Percent = tokenAmount.uiAmount * 0.01;

      const sendTokenToContract = await transferToken({
        sourceKey: privateKey,
        destinationAddress: contractAddress,
        amount: fundPayout99Percent,
        destinationAddressTwo: "9oyy3CwguMz5qiybc6pYbGgF9L5T6xLnfVrRg59evnzp",
        destinationTwoAmount: platformFee1Percent,
      });

      // console.log(sendTokenToContract);

      const { success, data } = sendTokenToContract;

      if (success === true) {
        const newDate = new Date();

        const percentage =
          ((newCurrentAmount + statics.totalRaised) / fundMetaData.goalAmount) *
          100;

        await Promise.all([
          FundRaiseDonor.findByIdAndUpdate(donateId, {
            $set: {
              currentAmount: newCurrentAmount,
              isFundPaid: newCurrentAmount >= getDonateInfo.amount,
              blockTime: newDate,
            },
            $push: {
              signature: data.signature,
            },
          }),
          WalletAddress.updateOne(
            { walletAddress },
            {
              $inc: { "balance.usdcBalance": tokenAmount.uiAmount },
            }
          ),
          FundRaise.findByIdAndUpdate(_id, {
            $inc: {
              "statics.totalRaised": fundPayout99Percent,
              "statics.totalDonor":
                newCurrentAmount >= getDonateInfo.amount ? 1 : 0,
            },
            $set: {
              "statics.lastPaymentTime": newDate,
              isFundRaiseFundedCompletely: percentage >= 100,
              isFundRaisedStopped: percentage >= 100,
              isFundRaiseActive: percentage >= 100 ? false : true,
              isFundRaisedEndDate: percentage >= 100 ? new Date() : null,
            },
            $max: {
              "statics.largestAmount": tokenAmount.uiAmount,
            },
          }),
          donationUserMail({
            email: getDonateInfo.email,
            name: getDonateInfo.name,
            date: newDate,
            signature: data.signature,
            amount: newCurrentAmount,
            title: fundMetaData.title,
            link: data.explorerLink,
          }),
          donationCreatorNotify({
            email: createdBy.email,
            name: `${createdBy.profile.firstName} ${createdBy.profile.lastName}`,
            message: getDonateInfo.note,
            donorName: getDonateInfo.name,
            date: newDate,
            amount: newCurrentAmount,
            currentAmount: newCurrentAmount + statics.totalRaised,
            goalAmount: fundMetaData.goalAmount,
            percentage,
            title: fundMetaData.title,
          }),
        ]);
      }

      console.log("process complete");
    });

    if (newCurrentAmount < getDonateInfo.amount) {
      return {
        code: 403,
        message: `Payment detected, but incomplete amount, send ${
          getDonateInfo.amount - newCurrentAmount
        } USDC to complete your donation. Thank you`,
      };
    }

    return {
      code: 200,
      data: tokensFound.data,
      message: "Thanks for your payment",
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = userMadePayment;
