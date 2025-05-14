const getAllDonation = require("../../service/fundraiseService/getDonations");

const getAllDonationsController = catchAsync(async (req, res) => {
  const { page } = req.query;
  const { fundraiseId } = req.params;

  try {
    const { code, message, data } = await getAllDonation({
      page,
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

module.exports = getAllDonationsController;
