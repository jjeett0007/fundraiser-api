/** @format */

const mongoose = require("mongoose");

const fundRaiseDonor = new mongoose.Schema({
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
});

const FundRaiseDonor = mongoose.model("FundRaiseDonor", fundRaiseDonor);
module.exports = FundRaiseDonor;