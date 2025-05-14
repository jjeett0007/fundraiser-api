/** @format */

const mongoose = require("mongoose");

const fileType = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const userVerificationData = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    meansOfVerification: {
      type: String,
      required: true,
    },
    idNumber: {
      type: String,
      required: true,
    },
    selfie: {
      type: String,
      required: true,
    },
    livenessVideo: {
      type: String,
      required: true,
    },
    documentData: {
      frontView: {
        type: String,
        required: true,
      },
      backView: {
        type: String,
      },
    },
    mobileNumber: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const methodOfValidation = new mongoose.Schema({
  fundraiseData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FundRaise",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userVerificationData: {
    type: userVerificationData,
    default: {},
  },
  proofOfFundRaiseVerify: {
    type: [fileType],
    required: true,
  },
  isFundRaiseVerified: {
    type: Boolean,
    default: false,
  },
  isFundRaiseVerifiedDate: {
    type: Date,
    default: null,
  },
  isFundRaiseVerifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    default: null,
  },
});

const FundRaiseVerify = mongoose.model("Fundraise-verify", methodOfValidation);

module.exports = FundRaiseVerify;
