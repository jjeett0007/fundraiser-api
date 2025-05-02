const { User } = require("../../model/index");
const bcrypt = require("bcrypt");
const passwordChangedConfirmationMail = require("../mailerService/passwordresetsuccessfully");
const config = require("../../config/index");

const changePassword = async (data) => {
  try {
    const { id, oldPassword, newPassword } = data;

    const user = await User.findById(id)
      .select("email password profile.firstName profile.lastName googleId")
      .lean();

    if (user.googleId) {
      return {
        code: 400,
        message:
          "You cannot change password for Google Authenticated Account, Login with Google"
      };
    }

    // Check if password field exists
    if (!user.password) {
      return {
        code: 400,
        message: "Invalid user account state"
      };
    }

    const [passwordMatch, newPasswordCompare] = await Promise.all([
      bcrypt.compare(oldPassword, user.password),
      bcrypt.compare(newPassword, user.password)
    ]);

    if (!passwordMatch) {
      return {
        code: 400,
        message: "Incorrect old password"
      };
    }

    if (newPasswordCompare) {
      return {
        code: 400,
        message: "Your New Password cannot be same as your old password"
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateResult = await User.findByIdAndUpdate(id, {
      password: hashedPassword
    });

    if (!updateResult) {
      return {
        code: 500,
        message: "Failed to update password"
      };
    }

    const date = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }).format(new Date());

    if (config.env !== "test") {
      await passwordChangedConfirmationMail({
        email: user.email,
        date,
        name:
          user.profile.firstName && user.profile.lastName
            ? `${user.profile.firstName} ${user.profile.lastName}`
            : "User"
      });
    }

    return { code: 200, message: "Password updated successfully" };
  } catch (error) {
    console.error("Change password error:", error);
    if (error.name === "CastError") {
      return { code: 400, message: "Invalid user ID format" };
    }
    return { code: 500, message: "Internal Server Error" };
  }
};

module.exports = changePassword;
