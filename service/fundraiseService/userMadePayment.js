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
      const sendTokenToContract = await transferToken({
        sourceKey: privateKey,
        destinationAddress: contractAddress,
        amount: tokenAmount.uiAmount,
      });

      console.log(sendTokenToContract);
    });

    setImmediate(async () => {
      await Promise.all([
        FundRaiseDonor.findByIdAndUpdate(
          donateId,
          {
            $set: {
              currentAmount: newCurrentAmount,
              isFundPaid: newCurrentAmount >= getDonateInfo.amount,
              blockTime: new Date(),
            },
          },
          { new: true }
        ),
        await WalletAddress.findOneAndUpdate(
          { walletAddress: walletAddress },
          {
            $inc: {
              "balance.usdcBalance": tokenAmount.uiAmount,
            },
          }
        ),
        await FundRaise.findByIdAndUpdate(
          _id,
          {
            $inc: {
              "statics.totalRaised": tokenAmount.uiAmount,
              "statics.totalDonor":
                newCurrentAmount >= getDonateInfo.amount ? 1 : 0,
            },
            $set: {
              "statics.lastPaymentTime": new Date(),
            },
            $max: {
              "statics.largestAmount": tokenAmount.uiAmount,
            },
          },
          { new: true }
        ),
      ]);

      console.log("Payment updated");
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
