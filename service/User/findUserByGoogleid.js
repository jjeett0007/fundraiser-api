const { User } = require("../../model/index");
const generateToken = require("../../utils/genToken");

const getUserByGoogleId = async ({ googleId }) => {
  try {
    const existingUser = await User.findOne({ googleId }).select(
      "googleId isVerified role _id email"
    );

    if (!existingUser) {
      return { code: 404, message: "ACCOUNT NOT FOUND" };
    }

    const token = await generateToken({
      id: existingUser._id.toString(),
      email: existingUser.email,
      role: existingUser.role,
      type: "access"
    });

    return {
      code: 200,
      data: {
        id: existingUser._id.toString(),
        email: existingUser.email,
        token: token
      }
    };
  } catch (error) {
    return { code: 500, message: "Internal Server Error", error };
  }
};

module.exports = getUserByGoogleId;
