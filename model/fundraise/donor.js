/** @format */

const mongoose = require("mongoose");

const fundRaiseDonor = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currentAmount: {
      type: Number,
      default: 0
    },
    note: {
      type: String,
      default: null
    },
    anonymous: {
      type: Boolean,
      default: false
    },
    fundRaiseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FundRaise",
      required: true
    },
    isFundPaid: {
      type: Boolean,
      default: false
    },
    from: {
      type: [String],
      default: []
    },
    walletAddress: {
      type: String,
      required: true
    },
    walletInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet"
    },
    signature: {
      type: [String],
      default: []
    },
    blockTime: {
      type: Date,
      default: null
    },
    tokenTypes: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const FundRaiseDonor = mongoose.model("FundRaiseDonor", fundRaiseDonor);
module.exports = FundRaiseDonor;
