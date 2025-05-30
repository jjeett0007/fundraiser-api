const resendOtp = require("../../service/User/resendOtp");

const optResend = catchAsync(async (req, res) => {
  const id = await getId(req, res);

  try {
    const { code, message, data } = await resendOtp(id);

    console.log("verifyOtp", { code, message, data });

    handleResponse(res, code, message, data);
  } catch (error) {
    res.status(statusCodeMap[500]).send({
      message: "Internal Server Error, Contact Dev team"
    });
  }
});
module.exports = optResend;
