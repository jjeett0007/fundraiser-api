const { Helius } = require("helius-sdk"); // Assuming you're using Helius SDK

const HELIUS_API_KEY = "0b2449ac-ce81-445c-b77f-3286179464f5";
const helius = new Helius(HELIUS_API_KEY);

const webhookId = "fcfe1f4d-60b5-46ec-9258-628c8f06b088";

async function addAddressToWebhook(walletAddress) {
  try {
    const response = await helius.appendAddressesToWebhook(webhookId, [
      walletAddress
    ]);
    console.log(`Added ${walletAddress} to webhook:`, response);
  } catch (err) {
    console.error(
      `❌ Failed to add address ${walletAddress} to webhook:`,
      err.message
    );
  }
}

async function removeAddressFromWebhook(walletAddress) {
  try {
    console.log(`Removing address ${walletAddress} from webhook...`);
    const response = await helius.removeAddressesFromWebhook(webhookId, [
      walletAddress
    ]);
    console.log(`Removed ${walletAddress} from webhook:`, response);
  } catch (err) {
    console.error(
      `❌ Failed to remove address ${walletAddress} from webhook:`,
      err.message
    );
  }
}

module.exports = {
  addAddressToWebhook,
  removeAddressFromWebhook
};
