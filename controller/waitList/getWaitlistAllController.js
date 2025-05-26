const getWaitlist = require("../../service/Waitlist/getWaitlist");

const getWaitlistAllController = catchAsync(async (req, res) => {
  const { page } = req.query;

  try {
    const { code, message, data } = await getWaitlist({
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
module.exports = getWaitlistAllController;