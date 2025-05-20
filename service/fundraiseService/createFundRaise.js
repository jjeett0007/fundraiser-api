const { FundRaise, User } = require("../../model/index");
const { fundRaiseCreated } = require("../mailerService/index");


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

    


    process.nextTick(async () => {
      const userget = await User.findById(id).select("email profile")
      const newDate = new Date()

      await Promise.all([
        User.findByIdAndUpdate(id, {
          $inc: { "statics.totalFundRaiseCreated": 1 },
        }),
        fundRaiseCreated({
          email: userget.email,
          name: `${userget.profile.firstName} ${userget.profile.lastName}`,
          title: title,
          date: newDate
        })
      ])

    });

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
