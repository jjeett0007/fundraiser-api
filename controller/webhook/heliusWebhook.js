const heliusHookHandler = require("../../service/handler/webhookhandler");

const heliusWebhook = catchAsync(async (req, res) => {
  const {
    description,
    fee,
    feePayer,
    nativeTransfers,
    source,
    timestamp,
    tokenTransfers,
    type,
    signature
  } = req.body[0];

  try {
    const { code, message, data } = await heliusHookHandler({
      description,
      fee,
      feePayer,
      nativeTransfers,
      source,
      timestamp,
      tokenTransfers,
      type,
      signature
    });
    handleResponse(res, code, message, data);
  } catch (error) {
    return error;
  }
});

module.exports = heliusWebhook;
