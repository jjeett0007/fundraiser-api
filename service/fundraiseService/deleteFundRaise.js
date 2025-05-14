const { FundRaise } = require("../../model/index");

const deleteFundRaise = async ({ id, fundraiseId }) => {
  try {
    const fundRaise = await FundRaise.findById(fundraiseId);

    if (!fundRaise) {
      return { code: 404, message: "Fundraise not found." };
    }

    const errorChecks = [
      {
        condition: fundRaise.createdBy.toString() !== id,
        code: 403,
        message: "You are not authorized to delete this fundraise.",
      },
      {
        condition:
          fundRaise.verify?.verificationId ||
          fundRaise.verify?.isVerificationInitalized === true,
        code: 403,
        message: "Fundraise is under review, can't be deleted.",
      },
      {
        condition: fundRaise.isInitialized,
        code: 400,
        message: "Fundraise Initialized (started), can't be deleted",
      },
    ];

    const error = errorChecks.find((check) => check.condition);

    if (error) {
      return { code: error.code, message: error.message };
    }

    await FundRaise.findByIdAndDelete(fundraiseId);

    return {
      code: 200,
      message: "Fundraise deleted successfully.",
    };
  } catch (error) {
    return error;
  }
};

module.exports = deleteFundRaise;
