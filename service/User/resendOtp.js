const { User, Otp } = require("../../model/index");
const generateConfirmationCode = require("../../utils/codeGen");
const sendVerificationEmail = require("../mailerService/sendVerificationEmail");

const resendOtp = async (userId) => {
  try {
    const user = await User.findById(userId);

    const conditions = [
      {
        check: !user,
        response: { code: 404, message: "User not found" }
      },
      {
        check: user?.isVerified,
        response: { code: 206, message: "User already verified" }
      }
    ];

    const failedCondition = conditions.find((condition) => condition.check);
    if (failedCondition) {
      return failedCondition.response;
    }

    const otpCode = await Otp.findOne({ email: user.email });
    const code = otpCode?.otp || generateConfirmationCode();

    if (!otpCode) {
      const expirationTime = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
      await Otp.create({
        email: user.email,
        otp: code,
        expiresAt: expirationTime
      });
    }

    await sendVerificationEmail({ email: user.email, code });
    return { code: 201, message: "OTP sent to your mail" };
  } catch (error) {
    return { code: 500, message: "Internal server error, Contact Support" };
  }
};

module.exports = resendOtp;
