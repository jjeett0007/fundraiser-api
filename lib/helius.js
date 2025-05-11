const { Helius, WebhookType, TransactionType } = require("helius-sdk"); // Assuming you're using Helius SDK
const HELIUS_API_KEY = "0b2449ac-ce81-445c-b77f-3286179464f5";

const helius = new Helius(HELIUS_API_KEY);

const webhookId = "977891b6-8250-4f38-b6fe-8837911b1483";

// function createWebHook() {
//   helius
//     .createWebhook({
//       accountAddresses: ["2iL6BDwuDWtRUbyFMaE9Ussmg2EwWFbY1N49e3g3eJWD"],
//       // authHeader: "some auth header",
//       webhookURL: "https://emergfunds.free.beeceptor.com/",
//       webhookType: WebhookType.ENHANCED,
//       transactionTypes: [TransactionType.ANY]
//     })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// createWebHook();

async function addAddressToWebhook(walletAddress, retries = 3, delay = 3000) {
  try {
    const res = await helius.appendAddressesToWebhook(webhookId, [
      walletAddress
    ]);
    console.log(`✅ Added ${walletAddress} to webhook:`, res);
  } catch (err) {
    if (err.response?.status === 429 && retries > 0) {
      console.warn(`⚠️ Rate limited. Retrying in ${delay}ms...`);
      setTimeout(() => {
        addAddressToWebhook(walletAddress, retries - 1, delay * 2);
      }, delay);
    } else {
      console.error(
        `❌ Failed to add address ${walletAddress} to webhook:`,
        err.message
      );
    }
  }
}

async function removeAddressFromWebhook(walletAddress, retries = 3, delay = 3000) {
  try {
    const res = await helius.removeAddressesFromWebhook(webhookId, [
      walletAddress
    ]);

    console.log(`✅ removed ${walletAddress} from webhook:`, res);
  } catch (err) {
    if (err.response?.status === 429 && retries > 0) {
      console.warn(`⚠️ Rate limited. Retrying in ${delay}ms...`);
      setTimeout(() => {
        removeAddressFromWebhook(walletAddress, retries - 1, delay * 2);
      }, delay);
    } else {
      console.error(
        `❌ Failed to remove address ${walletAddress} to webhook:`,
        err.message
      );
    }
  }
}

module.exports = {
  addAddressToWebhook,
  removeAddressFromWebhook
};
