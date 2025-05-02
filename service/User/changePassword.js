const { User, Token } = require("../../model/index");
const bcrypt = require("bcrypt");
const passwordChangedConfirmationMail = require("../mailerService/passwordresetsuccessfully");
const config = require("../../config/index");

const changePassword = async (data) => {
  const { token, id, newPassword } = data;

  try {
    const user = await User.findById(id).select(
      "email password profile.firstName profile.lastName googleId"
    );

    if (!user) {
      return { code: 404, message: "User not found" };
    }

    if (user && user.googleId) {
      return {
        code: 400,
        message:
          "You cannot change password for Google login, Login with Google"
      };
    }

    const passwordMatch = await bcrypt.compare(newPassword, user.password);

    if (passwordMatch) {
      return {
        code: 400,
        message: "New password cannot be the same as the current password"
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await Token.findOneAndDelete({ userId: user._id.toString(), token: token });

    const date = new Date(Date.now()).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });

    if (config.env !== "test") {
      await passwordChangedConfirmationMail({
        email: user.email,
        date,
        name: `${user.profile.firstName} ${user.profile.lastName}` || "User"
      });
    }

    return { code: 200, message: "Password reset successfully" };
  } catch (error) {
    return { code: 500, message: "Internal Server Error", error };
  }
};

module.exports = changePassword;
