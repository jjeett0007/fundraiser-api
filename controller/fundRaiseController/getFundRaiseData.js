const getFundRaiseDataById = require("../../service/fundraiseService/getFundRaiseById");

const getFundRaiseByIdController = catchAsync(async (req, res) => {
  const { fundraiseId } = req.params;

  try {
    const { code, message, data } = await getFundRaiseDataById({
      id: fundraiseId
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

module.exports = getFundRaiseByIdController;
