/** @format */

const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema(
  {
    solBalance: {
      type: Number,
      default: 0
    },
    usdcBalance: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const walletDataBase = new mongoose.Schema(
  {
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
    balance: {
      type: balanceSchema,
      default: {}
    },
    type: {
      type: String,
      enum: ["payment", "contract"],
      default: "payment"
    },
    signature: {
      type: [String],
      default: []
    },
    blockTime: {
      type: Date,
      default: null
    },
    feePayer: {
      type: String,
      default: null
    },
    fee: {
      type: Number,
      default: null
    },
    description: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const WalletAddress = mongoose.model("Wallet", walletDataBase);

module.exports = WalletAddress;
