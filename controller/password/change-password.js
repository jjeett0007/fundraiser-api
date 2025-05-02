const changePassword = require("../../service/User/changePassword");
const getIdFromString = require("../../utils/getTokenFromBody");

const changePasswordController = catchAsync(async (req, res) => {
  const { newPassword, token } = req.body;

  const id = await getIdFromString(token);

  try {
    const { code, message, data } = await changePassword({
      token,
      id,
      newPassword
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Internal Server Error" });
  }
});

module.exports = changePasswordController;
