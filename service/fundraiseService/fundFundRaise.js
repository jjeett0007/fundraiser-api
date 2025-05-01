const { FundRaise, FundRaiseDonor } = require("../../model/index");

const fundFundRaise = async ({
  name,
  email,
  amount,
  note,
  anonymous = false,
  fundRaiseId
}) => {
  try {
    const fundRaise = await FundRaise.findById(fundRaiseId);

    const errorChecks = [
      {
        condition: !fundRaise,
        code: 404,
        message: "Fundraise not found."
      },
      {
        condition: fundRaise.isFundRaisedStopped,
        code: 400,
        message: "Fundraise is stopped."
      },
      {
        condition: fundRaise.isFundRaiseEnded,
        code: 400,
        message: "Fundraise is ended."
      },
      {
        condition: fundRaise.currentAmount >= fundRaise.goalAmount,
        code: 400,
        message: "Fundraise goal already reached."
      }
    ];

    for (const check of errorChecks) {
      if (check.condition) {
        if (
          check.code === 400 &&
          check.message === "Fundraise goal already reached."
        ) {
          await FundRaise.findByIdAndUpdate(
            fundRaiseId,
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

    await new FundRaiseDonor({
      name,
      email,
      amount,
      note,
      anonymous,
      fundRaiseId
    }).save();

    return { code: 200, message: "Fundraise funded successfully." };
  } catch (error) {
    return { code: 500, message: "Server error.", error: error.message };
  }
};

module.exports = fundFundRaise;
