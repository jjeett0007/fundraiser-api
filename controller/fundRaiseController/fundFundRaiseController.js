const fundFundRaise = require("../../service/fundraiseService/fundFundRaise");

const fundFundRaiseController = catchAsync(async (req, res) => {
  const { fundraiseId } = req.params;
  const { name, email, amount, note, anonymous } = req.body;
  console.log("fundFundRaise", {
    fundraiseId,
    name,
    email,
    amount,
    note,
    anonymous
  });

  try {
    const { code, message, data } = await fundFundRaise({
      name,
      email,
      amount,
      note,
      anonymous,
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

module.exports = fundFundRaiseController;
