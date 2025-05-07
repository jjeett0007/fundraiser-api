const {
  createSolanaClient,
  generateKeyPairSigner,
  generateKeyPair,
  generateExtractableKeyPairSigner
} = require("gill");
const ed25519 = require("@noble/ed25519");
const bs58 = require("bs58").default;
const { Keypair } = require("@solana/web3.js");

const { rpc, rpcSubscriptions, sendAndConfirmTransaction } = createSolanaClient(
  {
    urlOrMoniker: "devnet"
  }
);

function generateWallet() {
  const genWallet = Keypair.generate();

  const walletPub = genWallet.publicKey.toString();
  const privateKey = bs58.encode(Buffer.from(genWallet.secretKey));

  const newWallet = {
    publicKey: walletPub,
    privateKey: privateKey
  };

  return newWallet;
}

async function getLatestBlockHash() {
  const slot = await rpc.getSlot().send();
  console.log("slot", slot);

  // get the latest blockhash
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
  console.log("latestBlockhash", latestBlockhash);

  return {
    slot,
    latestBlockhash
  };
}

module.exports = {
  generateWallet,
  getLatestBlockHash
};
