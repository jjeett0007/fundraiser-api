const updateAdminById = require("../../service/admin/updateAdmin");

const updateAdminController = catchAsync(async (req, res) => {
  const userId = await getId(req, res);
  const { profileInfo, address, avatar } = req.body;

  try {
    const { code, message, data } = await updateAdminById({
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
module.exports = updateAdminController;
