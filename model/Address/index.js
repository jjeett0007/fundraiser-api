/** @format */

const mongoose = require("mongoose");

const walletDataBase = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  currency: {
    type: String,
    default: "USDC"
  },
  mnemonic: {
    type: String
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  privateKey: {
    type: String,
    required: true
  },
  solBalance: {
    type: Number,
    default: 0
  },
  usdcBalance: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ["payment", "contract"],
    default: "payment"
  }
});

const WalletAddress = mongoose.model("Wallet", walletDataBase);

module.exports = WalletAddress;
