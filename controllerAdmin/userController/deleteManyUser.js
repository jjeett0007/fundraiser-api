const deleteManyUserByMail = require("../../service/admin-user-control/deleteManyUserByMail");

const deleteManyUserController = catchAsync(async (req, res) => {
  const { emails } = req.body;
  try {
    const { code, message } = await deleteManyUserByMail({ emails });

    handleResponse(res, code, message);
  } catch (error) {
    handleResponse(
      res,
      500,
      (message = "Internal Server Error, Contact Dev team"),
      (data = undefined)
    );
  }
});

module.exports = deleteManyUserController;
