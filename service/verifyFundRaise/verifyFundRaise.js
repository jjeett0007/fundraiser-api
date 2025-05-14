const { FundRaise, FundRaiseVerify } = require("../../model/index");

const verifyFundRaise = async ({
  id,
  fundraiseId,
  country,
  meansOfVerification,
  idNumber,
  selfie,
  livenessVideo,
  documentData,
  mobileNumber,
  fundRaiseProofs,
}) => {
  try {
    const fundRaise = await FundRaise.findById(fundraiseId);

    const errorChecks = [
      {
        condition: !fundRaise,
        code: 404,
        message: "Fundraise not found.",
      },
      {
        condition: fundRaise.createdBy.toString() !== id,
        code: 403,
        message: "Unauthorized.",
      },
      {
        condition: fundRaise.isInitialized,
        code: 400,
        message: "Fundraise already started.",
      },
      {
        condition: fundRaise.verify?.isVerificationInitalized === true,
        code: 403,
        message: "Under Verification",
      },
      {
        condition: fundRaise.verify.isFundRaiseVerified === true,
        code: 403,
        message: "Already Verified",
      },
    ];

    const error = errorChecks.find((check) => check.condition);

    if (error) {
      return { code: error.code, message: error.message };
    }

    const verificationData = await FundRaiseVerify.create({
      fundraiseData: fundraiseId,
      createdBy: id,
      userVerificationData: {
        country: country,
        meansOfVerification: meansOfVerification,
        idNumber: idNumber,
        selfie: selfie,
        livenessVideo: livenessVideo,
        documentData: documentData,
        mobileNumber: mobileNumber,
      },
      proofOfFundRaiseVerify: fundRaiseProofs,
    });

    await FundRaise.findByIdAndUpdate(fundraiseId, {
      "verify.verificationId": verificationData._id,
      "verify.isVerificationInitalized": true,
    });

    return {
      code: 200,
      message: "Verification Data accepted",
    };
  } catch (error) {
    return {
      code: 500,
      message: "Server error",
      data: error,
    };
  }
};

module.exports = verifyFundRaise;
