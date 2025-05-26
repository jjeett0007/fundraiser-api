const getAllUser = require("../../service/admin-user-control/get-all-user");

const getAllUserController = catchAsync(async (req, res) => {
  const { page } = req.query;

  try {
    const { code, message, data } = await getAllUser({
      page,
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    handleResponse(
      res,
      500,
      (message = "Internal Server Error, Contact Dev team"),
      (data = undefined)
    );
  }
});

module.exports = getAllUserController;
