const { User, FundRaise } = require("../../model/index");
const { deleteContact } = require("../mailerService/resendService/index");

const deleteManyUserByMail = async ({ emails }) => {
  try {
    const users = await User.find({ email: { $in: emails } }).select(
      "_id email"
    );

    if (users.length === 0) {
      return { code: 404, message: "No users found with the provided emails." };
    }

    process.nextTick(async () => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log(`Processing user ${i + 1} of ${users.length}`);

        await deleteContact({ email: user.email });
        await User.findByIdAndDelete(user._id);
        await FundRaise.deleteMany({ createdBy: user._id });
        console.log(`Deleted user: ${user.email}`);
      }
    });

    return { code: 200, message: "Users are being deleted." };
  } catch (error) {
    return { code: 500, message: "Server error.", error };
  }
};

module.exports = deleteManyUserByMail;
