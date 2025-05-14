const {
  address,
  createSolanaClient,
  generateKeyPairSigner,
  createTransaction,
  pipe,
  createTransactionMessage,
  getExplorerLink,
  getSignatureFromTransaction,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstructions,
  generateKeyPair,
  generateExtractableKeyPairSigner,
  createKeyPairSignerFromBytes,
  signTransactionMessageWithSigners,
} = require("gill");

const {
  getAssociatedTokenAccountAddress,
  getCreateAssociatedTokenIdempotentInstruction,
  getTransferInstruction,
  TOKEN_2022_PROGRAM_ADDRESS,
  TOKEN_PROGRAM_ADDRESS,
  getTransferTokensInstructions,
  buildTransferTokensTransaction,
} = require("gill/programs/token");

const bs58 = require("bs58").default;
const { Keypair, PublicKey } = require("@solana/web3.js");

const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

const tokenProgram = TOKEN_2022_PROGRAM_ADDRESS;

// Platform Default Fee Payer
const defaultFeePayer = async () => {
  const keypair = await createKeyPairSignerFromBytes(
    bs58.decode(
      "2VSva3p8rDwfebYz7jaFz9Vb7GsoihWKHcmjEFQ795EiELFyF6srpiDJx5QrCvWRBDurvCSp6EGAXjZeFcqBuZPy"
    )
  );

  return keypair;
};

const getPrivKey = async (key) => {
  const keypair = await createKeyPairSignerFromBytes(bs58.decode(key));

  return keypair;
};

const USDC_MINT = address("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");

const SOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");

const getPublicKey = (addressString) => address(addressString);

const getKeyPair = (key) => Keypair.fromSecretKey(bs58.decode(key));

const { rpc, rpcSubscriptions, sendAndConfirmTransaction } = createSolanaClient(
  {
    urlOrMoniker: "devnet",
  }
);

function generateWallet() {
  const genWallet = Keypair.generate();

  const walletPub = genWallet.publicKey.toString();
  const privateKey = bs58.encode(Buffer.from(genWallet.secretKey));

  const newWallet = {
    publicKey: walletPub,
    privateKey: privateKey,
  };

  return newWallet;
}

async function getLatestBlockHash() {
  const slot = await rpc.getSlot().send();

  // get the latest blockhash
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

  return {
    slot,
    latestBlockhash,
  };
}

const getAddressAta = async ({ mint, address }) => {
  const getAta = await getAssociatedTokenAccountAddress(
    mint,
    address,
    TOKEN_PROGRAM_ADDRESS
  );

  return getAta;
};

const transferToken = async ({ sourceKey, destinationAddress, amount }) => {
  console.log({ sourceKey, destinationAddress, amount });
  try {
    const feePayer = await defaultFeePayer();

    const source = await getPrivKey(sourceKey);

    const { slot, latestBlockhash } = await getLatestBlockHash();

    const destination = getPublicKey(destinationAddress);
    console.log(destination);

    const getDestinationATA = await getAddressAta({
      mint: USDC_MINT,
      address: destination,
    });

    const getSourceAta = await getAddressAta({
      mint: USDC_MINT,
      address: source.address,
    });

    // Create transaction message first
    const transactionMessage = pipe(
      createTransactionMessage({ version: "legacy" }),
      (tx) => setTransactionMessageFeePayerSigner(feePayer, tx),
      (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      (tx) =>
        appendTransactionMessageInstructions(
          [
            getCreateAssociatedTokenIdempotentInstruction({
              mint: USDC_MINT,
              payer: feePayer,
              tokenProgram: TOKEN_PROGRAM_ADDRESS,
              owner: destination,
              ata: getDestinationATA,
            }),
            getTransferInstruction(
              {
                source: getSourceAta,
                authority: source,
                destination: getDestinationATA,
                amount: amount * 10 ** 6,
              },
              { programAddress: TOKEN_PROGRAM_ADDRESS }
            ),
          ],
          tx
        )
    );

    // Then sign the transaction message
    // const signedTransaction = await signTransactionMessageWithSigners(transactionMessage);

    const signedTransaction = await signTransactionMessageWithSigners(
      transactionMessage
    );

    const signature = await sendAndConfirmTransaction(signedTransaction);

    const explorerLink = getExplorerLink({
      cluster: "devnet", // or the network you're using
      transaction: getSignatureFromTransaction(signedTransaction),
    });

    return {
      success: true,
      data: {
        signature,
        explorerLink,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

module.exports = {
  rpc,
  generateWallet,
  getLatestBlockHash,
  USDC_MINT,
  SOL_MINT,
  getPublicKey,
  getKeyPair,
  getPrivKey,
  tokenProgram,
  defaultFeePayer,
  transferToken,
};

// const transaction = createTransaction({
//   feePayer: feePayer,
//   version: "legacy",
//   instructions: [
//     // create idempotent will gracefully fail if the ata already exists. this is the gold standard!
//     getCreateAssociatedTokenIdempotentInstruction({
//       mint: USDC_MINT,
//       payer: feePayer,
//       tokenProgram: TOKEN_2022_PROGRAM_ADDRESS,
//       associatedTokenProgram:
//         "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
//       owner: destination,
//       ata: getDestinationATA,
//     }),
//     getTransferInstruction(
//       {
//         source: getSourceAta,
//         authority: source,
//         destination: getDestinationATA,
//         amount: amount * 10 ** 6,
//       },
//       { programAddress: TOKEN_2022_PROGRAM_ADDRESS }
//     ),
//   ],
//   latestBlockhash,
// });

// const transaction = await buildTransferTokensTransaction({
//   feePayer: feePayer,
//   version: "legacy",
//   latestBlockhash,
//   amount: amount * 10 ** 6,
//   authority: source,
//   destination: destinationAddress,
//   mint: USDC_MINT,
//   tokenProgram,
// });

// console.log(transaction);
