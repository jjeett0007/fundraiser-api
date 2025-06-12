const addUserToEmailSub = require("../../service/admin-user-control/user-emailSub");

const addToMailSubsController = catchAsync(async (req, res) => {
  try {
    const { code, message } = await addUserToEmailSub();

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

module.exports = addToMailSubsController;
