const forgotPassword = require("../../service/User/forgot-password");

const forgotPasswordController = catchAsync(async (req, res) => {
  const { email } = req.body;

  try {
    const { code, message, data } = await forgotPassword({ email });
    handleResponse(res, code, message, data);
  } catch (error) {
    res.status(statusCodeMap[500]).send({
      message: "Internal Server Error, Contact Dev team"
    });
  }
});

module.exports = forgotPasswordController;
