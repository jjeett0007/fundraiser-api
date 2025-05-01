const getLoggedUser = require("../../service/User/getLoggedUser");

const getUser = catchAsync(async (req, res) => {
  const id = await getId(req, res);

  try {
    const { code, message, data } = await getLoggedUser(id);

    handleResponse(res, code, message, data);
  } catch (error) {
    res.status(statusCodeMap[500]).send({
      message: "Internal Server Error, Contact Dev team",
    });
  }
});
module.exports = getUser;
