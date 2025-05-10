const { Helius } = require("helius-sdk"); // Assuming you're using Helius SDK

const HELIUS_API_KEY = "0b2449ac-ce81-445c-b77f-3286179464f5";
const helius = new Helius(HELIUS_API_KEY);

const webhookId = "fcfe1f4d-60b5-46ec-9258-628c8f06b088";

const walletAddresses = {};

// Function to handle wallet connection
async function monitorWallet(walletAddress, walletId, clientSocket) {
  // Add wallet address to webhook when a new WebSocket connection is made
  if (!walletAddresses[walletAddress]) {
    walletAddresses[walletAddress] = {
      wsSet: new Set(),
      walletId
    };

    // Add the wallet to the webhook
    await addAddressToWebhook(walletAddress);
  }

  // Track client socket
  walletAddresses[walletAddress].wsSet.add(clientSocket);

  // Handle WebSocket close event to remove address from webhook
  clientSocket.on("close", async () => {
    walletAddresses[walletAddress].wsSet.delete(clientSocket);

    // If no more WebSocket connections are present, remove address from webhook
    if (walletAddresses[walletAddress].wsSet.size === 0) {
      await removeAddressFromWebhook(walletAddress);

      // Clean up wallet address data
      delete walletAddresses[walletAddress];
    }
  });
}

// Function to add wallet address to the webhook
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

// Function to remove wallet address from the webhook
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
  monitorWallet
};