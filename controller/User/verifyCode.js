const verifyCode = require("../../service/User/verifycode");

const verifyOtp = catchAsync(async (req, res) => {
  try {
    const id = await getId(req, res);
    const { otpCode } = req.body;

    const { code, message, data } = await verifyCode({
      code: otpCode,
      id
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    res.status(statusCodeMap[500]).send({
      message: "Internal Server Error, Contact Dev team"
    });
  }
});
module.exports = verifyOtp;
