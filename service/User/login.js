const { User } = require("../../model/index");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/genToken");

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne(
      { email },
      "email password googleId role isVerified"
    );

    if (!user) {
      return { code: 404, message: "User not found" };
    }

    if (user.googleId) {
      return { code: 406, message: "Please login with Google" };
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return { code: 406, message: "Incorrect Password" };
    }

    user.lastLogin = new Date();
    await user.save();

    const token = await generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      type: "access"
    });

    return {
      code: user.isVerified ? 200 : 203,
      message: `Login Successful, ${
        user.isVerified ? "Verified" : "Please Verify your account"
      }`,
      data: {
        id: user._id.toString(),
        email: user.email,
        token
      }
    };
  } catch (error) {
    return { code: 500, message: "Internal Server Error", error };
  }
};

module.exports = loginUser;
