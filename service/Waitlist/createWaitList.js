const { WaitList } = require("../../model/index");

const createWaitList = async (data) => {
  const { email } = data;
  try {
    // Check if email already exists
    const existingEmail = await WaitList.findOne({ email });

    if (existingEmail) {
      return {
        code: 400,
        message: "Email already exists in waitlist"
      };
    }

    // Create new waitlist entry if email doesn't exist
    await WaitList.create({ email });

    return {
      code: 201,
      message: "Added to waitlist successfully"
    };
  } catch (error) {
    return {
      code: 500,
      message: "Error creating waitlist entry",
      error: error.message
    };
  }
};

module.exports = createWaitList;
