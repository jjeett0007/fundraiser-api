const { FundRaise } = require("../../model/index");

const deleteFundRaise = async ({ id, fundRaiseId }) => {
  try {
    const fundRaise = await FundRaise.findOne({ _id: fundRaiseId });

    if (!fundRaise) {
      return {
        code: 404,
        message: "Fundraise not found."
      };
    }

    if (fundRaise.createdBy.toString() !== id) {
      return {
        code: 403,
        message: "You are not authorized to delete this fundraise."
      };
    }

    await FundRaise.deleteOne({ _id: fundRaiseId });

    return {
      code: 200,
      message: "Fundraise deleted successfully."
    };
  } catch (error) {
    return error;
  }
};

module.exports = deleteFundRaise;
