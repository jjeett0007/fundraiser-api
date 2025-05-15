const withdrawFundRaised = require("../../service/fundraiseService/withdrawFundRaise");

const withdrawFundsController = catchAsync(async (req, res) => {
  const id = await getId(req, res);
  const { fundraiseId } = req.params;

  try {
    const { code, message, data } = await withdrawFundRaised({
      id,
      fundraiseId
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

module.exports = withdrawFundsController;
