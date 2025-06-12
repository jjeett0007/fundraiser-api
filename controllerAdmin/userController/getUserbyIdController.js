const getUserDetails = require("../../service/admin-user-control/getUser");

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  try {
    const { code, message, data } = await getUserDetails({ userId });

    handleResponse(res, code, message, data);
  } catch (error) {
    res.status(statusCodeMap[500]).send({
      message: "Internal Server Error, Contact Dev team"
    });
  }
});
module.exports = getUser;
