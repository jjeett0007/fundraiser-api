const deleteFundRaise = require("../../service/fundraiseService/deleteFundRaise");

const deleteFundRaiseController = catchAsync(async (req, res) => {
  const id = await getId(req, res);
  const { fundraiseId } = req.params;

  try {
    const { code, message, data } = await deleteFundRaise({
      id,
      fundraiseId,
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

module.exports = deleteFundRaiseController;
