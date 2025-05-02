/** @format */

const mongoose = require("mongoose");

const cron = require("node-cron");

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    expiresAt: { type: Date, default: Date.now }, // Set expiration time manually
  },
  { timestamps: true }
);

const Otp = mongoose.model("Otp", OtpSchema);

// Function to delete expired OTPs
const deleteExpiredOtps = async () => {
  try {
    const now = new Date();
    // console.log("checking");
    await Otp.deleteMany({ expiresAt: { $lte: now } });
  } catch (error) {
    console.error("Error deleting expired OTPs:", error.message);
  }
};


if (process.env.NODE_ENV !== "test") {
  // Schedule the task to run every minute
  cron.schedule("* * * * *", deleteExpiredOtps);
  console.log("✅ OTP cleanup scheduled");
}

module.exports = Otp;
