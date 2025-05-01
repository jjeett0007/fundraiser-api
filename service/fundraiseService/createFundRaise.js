const { FundRaise } = require("../../model/index");

const createFundRaise = async ({
  title,
  description,
  goalAmount,
  category,
  walletAddress,
  imageUrl,
  id
}) => {
  try {
    const existingFundRaise = await FundRaise.findOne({ title });

    if (existingFundRaise) {
      return {
        code: 400,
        message: "A fundraise with this title already exists."
      };
    }

    const fundRaise = await FundRaise.create({
      title,
      description,
      goalAmount,
      category,
      walletAddress,
      imageUrl,
      createdBy: id
    });

    return {
      code: 200,
      data: {
        fundRaiseId: fundRaise._id.toString()
      }
    };
  } catch (error) {
    return error;
  }
};

module.exports = createFundRaise;
