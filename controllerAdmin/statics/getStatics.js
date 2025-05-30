const getStatics = require("../../service/admin-statics/index");

const getStaticsController = catchAsync(async (req, res) => {
  try {
    const { code, message, data } = await getStatics();

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

module.exports = getStaticsController;
