const getAllFundRaises = require("../../service/fundraiseService/getFundRaises");

const getAllFundRaiseController = catchAsync(async (req, res) => {
  const { page, category } = req.query;

  try {
    const { code, message, data } = await getAllFundRaises({
      page,
      category
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

module.exports = getAllFundRaiseController;
