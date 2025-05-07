const getPaymentDetails = require("../../service/fundraiseService/getPaymentDetails");

const getPaymentInfoController = catchAsync(async (req, res) => {
  const { donateId } = req.params;

  try {
    const { code, message, data } = await getPaymentDetails({
      donateId
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

module.exports = getPaymentInfoController;
