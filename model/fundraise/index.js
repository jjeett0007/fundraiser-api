/** @format */

const mongoose = require("mongoose");

const fundMetaDataSchema = new mongoose.Schema(
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
        "family",
        "food",
        "transportation"
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
    videoUrl: {
      type: String,
      default: null
    }
  },
  { _id: false }
);

const fundRaiseDb = new mongoose.Schema(
  {
    fundMetaData: {
      type: fundMetaDataSchema,
      default: {}
    },

    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet"
    },

    contractAddress: {
      type: String,
      default: null
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isInitialized: {
      type: Boolean,
      default: false
    },

    isDeleted: {
      type: Boolean,
      default: false
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
    },
    isTotalDonor: {
      type: Number,
      default: 0
    },
    reportCount: {
      type: Number,
      default: 0
    },
    isFundRaiseVerified: {
      type: Boolean,
      default: false
    },
    isFundRaiseVerifiedDate: {
      type: Date,
      default: null
    },
    isFundRaiseVerifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null
    },
    isFundRaiseVerifiedComment: {
      type: String,
      default: null
    },
    isFundRaiseVerifiedStatus: {
      type: String,
      enum: ["approved", "rejected"],
      default: null
    },
    isFundRaiseDeactivated: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const FundRaise = mongoose.model("FundRaise", fundRaiseDb);

module.exports = FundRaise;
