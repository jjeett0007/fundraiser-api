const getLoggedUser = require("../../service/User/getLoggedUser");

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  try {
    const { code, message, data } = await getLoggedUser(userId);

    handleResponse(res, code, message, data);
  } catch (error) {
    res.status(statusCodeMap[500]).send({
      message: "Internal Server Error, Contact Dev team"
    });
  }
});
module.exports = getUser;
