const loginUser = require("../../service/User/login");

const userLogin = catchAsync(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const { code, message, data } = await loginUser({
      email,
      password
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    res.status(statusCodeMap[500]).send({
      message: "Internal Server Error, Contact Dev team"
    });
  }
});
module.exports = userLogin;
