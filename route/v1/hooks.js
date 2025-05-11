const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");

// controller hooks
const heliusWebhook = require("../../controller/webhook/heliusWebhook");

router.post("/helius", heliusWebhook);

module.exports = router;
