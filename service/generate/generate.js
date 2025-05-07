const { WalletAddress } = require("../../model/index");
const { generateWallet } = require("../../lib/solana-block-service");

async function generateAddress(type) {
  const walletData = generateWallet();

  const newWalletData = await WalletAddress.create({
    walletAddress: walletData.publicKey,
    privateKey: walletData.privateKey,
    type
  });

  return {
    id: newWalletData._id.toString(),
    address: walletData.publicKey
  };
}

module.exports = { generateAddress };
