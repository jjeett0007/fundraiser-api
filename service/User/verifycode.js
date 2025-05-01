const { User, Otp } = require("../../model/index");

const verifyCode = async ({ id: userId, code }) => {
  try {
    if (!code) {
      return { code: 400, message: "OTP CODE REQUIRED" };
    }

    const user = await User.findById(userId);

    const conditions = [
      { check: !user, code: 404, message: "USER NOT FOUND" },
      { check: user?.isVerified, code: 206, message: "USER ALREADY VERIFIED" }
    ];

    const failedCondition = conditions.find((condition) => condition.check);
    if (failedCondition) {
      return { code: failedCondition.code, message: failedCondition.message };
    }

    const otpCode = await Otp.findOne({ email: user.email });

    const otpConditions = [
      { check: !otpCode, code: 404, message: "OTP CODE EXPIRED" },
      { check: otpCode?.otp !== code, code: 403, message: "OTP CODE NOT MATCH" }
    ];

    const otpFailedCondition = otpConditions.find(
      (condition) => condition.check
    );
    if (otpFailedCondition) {
      return {
        code: otpFailedCondition.code,
        message: otpFailedCondition.message
      };
    }

    await User.updateOne({ _id: userId }, { isVerified: true });
    return { code: 200, message: "VERIFIED" };
  } catch (error) {
    return {
      code: 500,
      message: "INTERNAL SERVER ERROR",
      error: error.message
    };
  }
};

module.exports = verifyCode;
