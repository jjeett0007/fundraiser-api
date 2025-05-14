const verifyFundRaise = require("../../service/verifyFundRaise/verifyFundRaise");

const verifyFundRaiseController = catchAsync(async (req, res) => {
  const id = await getId(req, res);
  const { fundraiseId } = req.params;
  const {
    country,
    meansOfVerification,
    idNumber,
    selfie,
    livenessVideo,
    documentData,
    mobileNumber,
    fundRaiseProofs,
  } = req.body;

  try {
    const { code, message, data } = await verifyFundRaise({
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
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    handleResponse(
      res,
      500,
      (message = "Internal Server Error, Contact Dev team"),
      (data = undefined)
    );
  }
});

module.exports = verifyFundRaiseController;
