const {
  FundRaiseDonor,
  WalletAddress,
  FundRaise,
} = require("../../model/index");
const { getATokenAccounts } = require("../../lib/getTokenAccounts");
const { transferToken } = require("../../lib/solana-block-service");

const userMadePayment = async ({ donateId }) => {
  try {
    const getDonateInfo = await FundRaiseDonor.findById(donateId)
      .select(
        "_id name email note anonymous fundRaiseId, walletAddress amount isFundPaid currentAmount"
      )
      .populate("walletInfo", "privateKey walletAddress")
      .populate("fundRaiseId", "_id contractAddress");

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
    const { _id, contractAddress } = getDonateInfo.fundRaiseId;

    // Extract tokenAmount from tokensFound
    const tokenAmount = tokensFound.data.account.data.parsed.info.tokenAmount;

    console.log(tokenAmount);

    console.log("New main amount:", getDonateInfo.currentAmount);

    // Convert amount string to number and adjust for decimals
    const newCurrentAmount =
      Number(getDonateInfo.currentAmount) + Number(tokenAmount.uiAmount);

    console.log("New current amount:", tokenAmount.uiAmount);

    if (tokenAmount.uiAmount === 0) {
      return {
        code: 404,
        message: "payment not received, try again",
      };
    }

    const sendTokenToContract = await transferToken({
      sourceKey: privateKey,
      destinationAddress: contractAddress,
      amount: tokenAmount.uiAmount,
    });

    console.log(sendTokenToContract);

    await FundRaiseDonor.findByIdAndUpdate(
      donateId,
      {
        $set: {
          currentAmount: newCurrentAmount,
          isFundPaid: newCurrentAmount >= getDonateInfo.amount,
          blockTime: new Date(),
        },
      },
      { new: true }
    );

    await WalletAddress.findOneAndUpdate(
      { walletAddress: walletAddress },
      {
        $inc: {
          "balance.usdcBalance": tokenAmount.uiAmount,
        },
      }
    );

    if (newCurrentAmount < getDonateInfo.amount) {
      return {
        code: 403,
        message: `Payment detected, but incomplete amount, send ${
          getDonateInfo.amount - newCurrentAmount
        } USDC to complete your donation. Thank you`,
      };
    }

    await FundRaise.findByIdAndUpdate(
      _id,
      {
        $inc: {
          "statics.totalRaised": tokenAmount.uiAmount,
          "statics.totalDonor": 1,
        },
        $set: {
          "statics.lastPaymentTime": new Date(),
        },
        $max: {
          "statics.largestAmount": tokenAmount.uiAmount,
        },
      },
      { new: true }
    );

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
