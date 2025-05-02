const changePassword = require("../../service/User/changeUserPassword");

const updateUserPassword = catchAsync(async (req, res) => {
  const id = await getId(req, res);
  const { oldPassword, newPassword } = req.body;

  try {
    const { code, message, data } = await changePassword({
      id,
      oldPassword,
      newPassword
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Internal Server Error" });
  }
});

module.exports = updateUserPassword;
