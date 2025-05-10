const createWaitList = require("../../service/Waitlist/createWaitList");

const createWaitListController = catchAsync(async (req, res) => {
  const { email } = req.body;
  try {
    const { code, message, data } = await createWaitList({
      email
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    res.status(statusCodeMap[500]).send({
      message: "Internal Server Error, Contact Dev team"
    });
  }
});
module.exports = createWaitListController;
