const mongoose = require("mongoose");

const waitListSchema = new mongoose.Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phoneNumber: {
      type: String
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const WaitList = mongoose.model("WaitList", waitListSchema);
module.exports = WaitList;
