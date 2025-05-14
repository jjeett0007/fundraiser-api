const getAllVerificationData = require("../../service/verifyFundRaise/getAllVerification");

const getAllVerificationController = catchAsync(async (req, res) => {
  const { page } = req.query;

  try {
    const { code, message, data } = await getAllVerificationData({
      page,
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

module.exports = getAllVerificationController;
