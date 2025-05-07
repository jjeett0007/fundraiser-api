const createFundRaise = require("../../service/fundraiseService/createFundRaise");

const createFundRaiseController = catchAsync(async (req, res) => {
  const id = await getId(req, res);
  const {
    title,
    description,
    goalAmount,
    category,
    walletAddress,
    imageUrl,
    videoUrl
  } = req.body;

  try {
    const { code, message, data } = await createFundRaise({
      title,
      description,
      goalAmount,
      category,
      walletAddress,
      imageUrl,
      videoUrl,
      id
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

module.exports = createFundRaiseController;
