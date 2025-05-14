const { FundRaise, User } = require("../../model/index");

const createFundRaise = async ({
  title,
  description,
  goalAmount,
  category,
  walletAddress,
  imageUrl,
  videoUrl,
  id,
}) => {
  try {
    const existingFundRaise = await FundRaise.findOne({ title });

    if (existingFundRaise) {
      return {
        code: 400,
        message: "A fundraise with this title already exists.",
      };
    }

    const fundRaise = await FundRaise.create({
      fundMetaData: {
        title,
        description,
        goalAmount,
        category,
        walletAddress,
        imageUrl,
        videoUrl,
      },
      createdBy: id,
    });

    await Promise.all([
      User.findByIdAndUpdate(id, {
        $inc: { "statics.totalFundRaiseCreated": 1 },
      }),
    ]);

    // process.nextTick(() => {

    // });

    return {
      code: 200,
      data: {
        fundRaiseId: fundRaise._id.toString(),
      },
    };
  } catch (error) {
    return error;
  }
};

module.exports = createFundRaise;
