const { User } = require("../../model/index");

const getUserDetails = async ({ userId }) => {
  try {
    const user = await User.findById(userId).select("-password");

    return {
      code: 200,
      data: user
    };
  } catch (error) {
    return error;
  }
};
module.exports = getUserDetails;
