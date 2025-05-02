const { User } = require("../../model/index");
const changePassword = require("../mailerService/changePassword");
const generateToken = require("../../utils/genToken");
const config = require("../../config/index");

const ERROR_CONDITIONS = [
  {
    check: (user) => !user,
    response: { code: 404, message: "User not found" }
  },
  {
    check: (user) => user.googleId,
    response: { code: 400, message: "Use Google to Sign In" }
  }
];

const forgotPassword = async ({ email }) => {
  try {
    const user = await User.findOne(
      { email },
      { _id: 1, email: 1, googleId: 1, role: 1 }
    );

    // Check for error conditions
    for (const condition of ERROR_CONDITIONS) {
      if (condition.check(user)) {
        return condition.response;
      }
    }

    const token = await generateToken({
      id: user._id.toString(),
      email: user.email,
      role: "user",
      type: "reset"
    });

    if (config.env !== "test") {
      await changePassword({ email: user.email, token: token.access });
    }

    return { code: 200, message: "Password reset link sent to your email" };
  } catch (error) {
    console.error("Forgot password error:", error);
    return { code: 500, message: "Internal server error" };
  }
};

module.exports = forgotPassword;
