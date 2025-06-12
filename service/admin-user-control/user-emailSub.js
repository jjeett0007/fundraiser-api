const { User } = require("../../model/index");
const { addContact } = require("../mailerService/resendService/index");

const addUserToEmailSub = async () => {
  try {
    const users = await User.find({ emailSubscription: false }).select(
      "_id email profile.firstName profile.lastName"
    );

    process.nextTick(async () => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log(`Processing user ${i + 1} of ${users.length}`);

        const result = await addContact({
          email: user.email,
          firstName: user.profile.firstName,
          lastName: user.profile.lastName
        });

        if (result.code === 200) {
          await User.findByIdAndUpdate(user._id, { emailSubscription: true });
        }
      }
    });

    return { code: 200, message: "updating" };
  } catch (error) {
    return { code: 500, message: "Server error.", error };
  }
};

module.exports = addUserToEmailSub;
