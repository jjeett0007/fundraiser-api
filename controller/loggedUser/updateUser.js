const updateUserById = require("../../service/User/updateUser");

const updateUserController = catchAsync(async (req, res) => {
  const userId = await getId(req, res);
  const { profileInfo, address, avatar } = req.body;

  try {
    const { code, message, data } = await updateUserById({
      userId,
      profileInfo,
      address,
      avatar
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    res.status(statusCodeMap[500]).send({
      message: "Internal Server Error, Contact Dev team"
    });
  }
});
module.exports = updateUserController;
