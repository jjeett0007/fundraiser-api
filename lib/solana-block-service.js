const config = require("../config/index");

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
  signTransactionMessageWithSigners
} = require("gill");

const {
  getAssociatedTokenAccountAddress,
  getCreateAssociatedTokenIdempotentInstruction,
  getTransferInstruction,
  TOKEN_2022_PROGRAM_ADDRESS,
  TOKEN_PROGRAM_ADDRESS,
  getTransferTokensInstructions,
  buildTransferTokensTransaction
} = require("gill/programs/token");

const bs58 = require("bs58").default;
const { Keypair, PublicKey } = require("@solana/web3.js");

// Platform Default Fee Payer
const defaultFeePayer = async () => {
  const keypair = await createKeyPairSignerFromBytes(
    bs58.decode(config.block.feePayer)
  );

  return keypair;
};

const getPrivKey = async (key) => {
  const keypair = await createKeyPairSignerFromBytes(bs58.decode(key));

  return keypair;
};

const USDC_MINT = address(config.block.usdcMint);

const SOL_MINT = new PublicKey(config.block.solanaNative);

const getPublicKey = (addressString) => address(addressString);

const getKeyPair = (key) => Keypair.fromSecretKey(bs58.decode(key));

const { rpc, rpcSubscriptions, sendAndConfirmTransaction } = createSolanaClient(
  {
    urlOrMoniker: config.block.network
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

  // get the latest blockhash
  const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

  return {
    slot,
    latestBlockhash
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

const transferToken = async ({
  sourceKey,
  destinationAddress,
  amount,
  destinationAddressTwo,
  destinationTwoAmount,
  destinationAddressThree,
  destinationThreeAmount
}) => {
  try {
    console.log({
      sourceKey,
      destinationAddress,
      amount,
      destinationAddressTwo,
      destinationTwoAmount,
      destinationAddressThree,
      destinationThreeAmount
    });

    const [feePayer, source] = await Promise.all([
      defaultFeePayer(),
      getPrivKey(sourceKey)
    ]);

    const { slot, latestBlockhash } = await getLatestBlockHash();

    const destination = getPublicKey(destinationAddress);

    const addressAtaPromises = [
      getAddressAta({
        mint: USDC_MINT,
        address: source.address
      }),
      getAddressAta({
        mint: USDC_MINT,
        address: destination
      })
    ];

    // Push destinationAddressTwo only if it exists
    if (
      destinationAddressTwo &&
      destinationTwoAmount &&
      destinationTwoAmount > 0
    ) {
      addressAtaPromises.push(
        getAddressAta({
          mint: USDC_MINT,
          address: getPublicKey(destinationAddressTwo)
        })
      );
    }

    // Push destinationAddressThree only if it exists
    if (
      destinationAddressThree &&
      destinationThreeAmount &&
      destinationThreeAmount > 0
    ) {
      addressAtaPromises.push(
        getAddressAta({
          mint: USDC_MINT,
          address: getPublicKey(destinationAddressThree)
        })
      );
    }

    const results = await Promise.all(addressAtaPromises);

    const getSourceAta = results[0];
    const getDestinationATA = results[1];
    const getDestinationATATwo = destinationAddressTwo ? results[2] : null;
    const getDestinationATAThree = destinationAddressThree ? results[3] : null;

    console.log(getDestinationATATwo);

    const instructions = [
      getCreateAssociatedTokenIdempotentInstruction({
        mint: USDC_MINT,
        payer: feePayer,
        tokenProgram: TOKEN_PROGRAM_ADDRESS,
        owner: destination,
        ata: getDestinationATA
      }),
      getTransferInstruction(
        {
          source: getSourceAta,
          authority: source,
          destination: getDestinationATA,
          amount: Math.trunc(amount) * 10 ** 6
        },
        { programAddress: TOKEN_PROGRAM_ADDRESS }
      )
    ];

    if (
      destinationAddressTwo &&
      destinationTwoAmount &&
      destinationTwoAmount > 0
    ) {
      instructions.push(
        getCreateAssociatedTokenIdempotentInstruction({
          mint: USDC_MINT,
          payer: feePayer,
          tokenProgram: TOKEN_PROGRAM_ADDRESS,
          owner: getPublicKey(destinationAddressTwo),
          ata: getDestinationATATwo
        }),
        getTransferInstruction(
          {
            source: getSourceAta,
            authority: source,
            destination: getDestinationATATwo,
            amount: Math.trunc(destinationTwoAmount) * 10 ** 6
          },
          { programAddress: TOKEN_PROGRAM_ADDRESS }
        )
      );
    }

    if (
      destinationAddressThree &&
      destinationThreeAmount &&
      destinationThreeAmount > 0
    ) {
      instructions.push(
        getCreateAssociatedTokenIdempotentInstruction({
          mint: USDC_MINT,
          payer: feePayer,
          tokenProgram: TOKEN_PROGRAM_ADDRESS,
          owner: getPublicKey(destinationAddressThree),
          ata: getDestinationATAThree
        }),
        getTransferInstruction(
          {
            source: getSourceAta,
            authority: source,
            destination: getDestinationATAThree,
            amount: Math.trunc(destinationThreeAmount) * 10 ** 6
          },
          { programAddress: TOKEN_PROGRAM_ADDRESS }
        )
      );
    }

    // Create transaction message first
    const transactionMessage = pipe(
      createTransactionMessage({ version: "legacy" }),
      (tx) => setTransactionMessageFeePayerSigner(feePayer, tx),
      (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      (tx) => appendTransactionMessageInstructions(instructions, tx)
    );

    // Then sign the transaction message
    // const signedTransaction = await signTransactionMessageWithSigners(transactionMessage);

    const signedTransaction = await signTransactionMessageWithSigners(
      transactionMessage
    );

    const signature = await sendAndConfirmTransaction(signedTransaction);

    const explorerLink = getExplorerLink({
      cluster: config.block.network, // or the network you're using
      transaction: getSignatureFromTransaction(signedTransaction)
    });

    return {
      success: true,
      data: {
        signature,
        explorerLink
      }
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error
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
  defaultFeePayer,
  transferToken
};
