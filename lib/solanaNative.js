const config = require("../config/index");

const {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  TOKEN_PROGRAM_ID
} = require("@solana/spl-token");

const bs58 = require("bs58").default;

const {
  Keypair,
  Connection,
  clusterApiUrl,
  PublicKey
} = require("@solana/web3.js");

const connection = new Connection(
  clusterApiUrl(config.block.network),
  "confirmed"
);

const USDC_MINT = new PublicKey(config.block.usdcMint);

const getPublicKey = (address) => new PublicKey(address);

const getKeyPair = (key) => Keypair.fromSecretKey(bs58.decode(key));

const getTokenBalance = async (walletAddress) => {
  const publicKey = getPublicKey(walletAddress);
  const balance = await connection.getTokenAccountBalance(
    await getAssociatedTokenAddress(USDC_MINT, publicKey)
  );
  return balance.value.uiAmount;
};

module.exports = {
  getTokenBalance
};
