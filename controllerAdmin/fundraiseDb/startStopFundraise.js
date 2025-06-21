const {
  startFundraiseByAdmin,
  stopFundraiseByAdmin,
  deleteFundraiseByAdmin
} = require("../../service/admin-fundraise/startStopFundraise");

const startFundraiseController = catchAsync(async (req, res) => {
  const { fundraiseId } = req.params;
  const { code, message, data } = await startFundraiseByAdmin(fundraiseId);
  handleResponse(res, code, message, data);
});

const stopFundraiseController = catchAsync(async (req, res) => {
  const { fundraiseId } = req.params;
  const { code, message, data } = await stopFundraiseByAdmin(fundraiseId);
  handleResponse(res, code, message, data);
});

const deleteFundraiseController = catchAsync(async (req, res) => {
  const { fundraiseId } = req.params;
  const { code, message, data } = await deleteFundraiseByAdmin(fundraiseId);
  handleResponse(res, code, message, data);
});

module.exports = {
  startFundraiseController,
  stopFundraiseController,
  deleteFundraiseController
};
