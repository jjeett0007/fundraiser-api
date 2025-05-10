const {
  FundRaise,
  WalletAddress,
  FundRaiseDonor
} = require("../../model/index");

const {
  USDC_MINT,
  getPublicKey,
  getPrivKey,
  defaultFeePayer,
  tokenProgram,
  rpc,
  getLatestBlockHash,
  sendAndConfirmTransaction,
  transferToken
} = require("../../lib/solana-block-service");

const { removeAddressFromWebhook } = require("../../lib/helius");

const heliusHookHandler = async (data) => {
  const {
    description,
    fee,
    feePayer,
    nativeTransfer,
    source,
    timestamp,
    tokenTransfer,
    type,
    signature
  } = data;

  try {
    if (type === "TRANSFER") {
      if (source === "SOLANA_PROGRAM_LIBRARY") {
        if (tokenTransfer && tokenTransfer.length > 0) {
          const {
            mint,
            fromUserAccount,
            toUserAccount,
            tokenAmount,
            tokenStandard
          } = tokenTransfer[0];

          if (tokenStandard === "Fungible") {
            const mintPublicKey = getPublicKey(mint);

            if (mintPublicKey === USDC_MINT) {
              // find address in database
              const donationInfo = await FundRaiseDonor.findOne({
                walletAddress: toUserAccount
              })
                .select(
                  "currentAmount amount fundRaiseId walletAddress walletInfo"
                )
                .populate("walletInfo", "privateKey walletAddress")
                .populate("fundRaiseId", "_id contractAddress");
              // check total funds = amount

              if (
                donationInfo.currentAmount + tokenAmount >=
                donationInfo.amount
              ) {
                // update fundraiseDonor
                await FundRaiseDonor.findByIdAndUpdate(
                  donationInfo._id.toString(),
                  {
                    $set: {
                      currentAmount: donationInfo.currentAmount + tokenAmount,
                      isFundPaid: true,
                      $push: {
                        from: fromUserAccount,
                        signature: signature,
                        tokenTypes: "USDC"
                      },
                      blockTime: timestamp
                    }
                  },
                  { new: true }
                );

                // remove from webhook
                await removeAddressFromWebhook(toUserAccount);

                // notify user

                // transfer fund from toUserAccount to contract address and update fundraise contract
                // get contract address

                const { privateKey, walletAddress } = donationInfo.walletInfo;
                const { _id, contractAddress } = donationInfo.fundRaiseId;

                const sendTokenToContract = await transferToken({
                  sourceKey: privateKey,
                  destinationAddress: contractAddress,
                  amount: donationInfo.currentAmount + tokenAmount
                });

                console.log(sendTokenToContract);

                return {
                  code: 200,
                  message: "Operation Success"
                };
              }
            }
          } else {
            return {
              code: 404,
              message: "No token transfer found"
            };
          }
        }
      }

      if (source === "SYSTEM_PROGRAM") {
        return {
          code: 200,
          message: "SOL GET"
        };
      }
    } else {
      return {
        code: 404,
        message: "type must be TRANSFER"
      };
    }
  } catch (error) {
    return error;
  }
};

module.exports = heliusHookHandler;
