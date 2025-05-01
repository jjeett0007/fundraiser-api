/** @format */

const mongoose = require("mongoose");

const fundRaiseDb = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    goalAmount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "USDC"
    },
    currentAmount: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      enum: [
        "medical",
        "urgent bills",
        "charity",
        "emergency",
        "animal",
        "crisis",
        "family"
      ],
      required: true
    },
    walletAddress: {
      type: String,
      required: true
    },

    imageUrl: {
      type: String,
      required: true
    },

    isDeleted: {
      type: Boolean,
      default: false
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isFundRaiseStarted: {
      type: Boolean,
      default: null
    },

    isFundRaiseEnded: {
      type: Boolean,
      default: null
    },

    isFundRaiseActive: {
      type: Boolean,
      default: false
    },

    isFundRaiseFunded: {
      type: Boolean,
      default: false
    },

    isFundRaisedStopped: {
      type: Boolean,
      default: false
    },

    isFundRaiseDeleted: {
      type: Boolean,
      default: false
    },

    isFundRaiseFundsComplete: {
      type: Boolean,
      default: false
    },

    isFundRaiseFundedCompletely: {
      type: Boolean,
      default: false
    },

    isFundRaisedStartedDate: {
      type: Date,
      default: null
    },

    isFundRaisedEndDate: {
      type: Date,
      default: null
    },

    isTotalFundCounts: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const FundRaise = mongoose.model("FundRaise", fundRaiseDb);

module.exports = FundRaise;
