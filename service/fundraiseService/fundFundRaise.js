const { FundRaise, FundRaiseDonor } = require("../../model/index");
const { generateAddress } = require("../generate/generate");
const { addAddressToWebhook } = require("../../lib/helius");

const fundFundRaise = async ({
  name,
  email,
  amount,
  note,
  anonymous = false,
  id
}) => {
  try {
    const fundRaise = await FundRaise.findById(id);

    const errorChecks = [
      {
        condition: !fundRaise,
        code: 404,
        message: "Fundraise not found."
      },
      {
        condition: !fundRaise.isFundRaiseStarted,
        code: 400,
        message: "Fundraise not started."
      },
      {
        condition: fundRaise.isFundRaisedStopped,
        code: 400,
        message: "Fundraise stopped."
      },
      {
        condition: fundRaise.isFundRaiseEnded,
        code: 400,
        message: "Fundraise ended."
      },
      {
        condition: fundRaise.currentAmount >= fundRaise.goalAmount,
        code: 403,
        message: "Fundraise goal already reached."
      }
    ];

    for (const check of errorChecks) {
      if (check.condition) {
        if (
          check.code === 403 &&
          check.message === "Fundraise goal already reached."
        ) {
          await FundRaise.findByIdAndUpdate(
            fundRaise._id.toString(),
            {
              isFundRaiseEnded: true,
              isFundRaisedStopped: true,
              isFundRaiseActive: false,
              isFundRaisedEndDate: new Date()
            },
            { new: true }
          );
        }
        return { code: check.code, message: check.message };
      }
    }

    const paymentReference = await generateAddress("payment");

    const getFundData = await FundRaiseDonor.create({
      name,
      email,
      amount,
      note,
      anonymous,
      fundRaiseId: fundRaise._id.toString(),
      walletAddress: paymentReference.address,
      walletInfo: paymentReference.id
    });

    await addAddressToWebhook(paymentReference.address);

    return {
      code: 200,
      message: "Payment data generated",
      data: {
        donateId: getFundData._id.toString()
      }
    };
  } catch (error) {
    return { code: 500, message: "Server error.", error: error.message };
  }
};

module.exports = fundFundRaise;
