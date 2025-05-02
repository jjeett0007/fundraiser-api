const mongoose = require("mongoose");
const cron = require("node-cron");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    token: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"] },
    type: {
      type: String,
      enum: ["access", "refresh", "reset", "2fa"],
      required: true
    },
    status: { type: String, enum: ["active", "revoked"] },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);

const deleteExpiredTokens = async () => {
  try {
    const now = new Date();
    const result = await Token.deleteMany({ expiresAt: { $lte: now } });
    if (result.deletedCount > 0) {
      console.log(`🗑️ Deleted ${result.deletedCount} expired tokens`);
    }
  } catch (error) {
    console.error("❌ Error deleting expired tokens:", error.message);
  }
};

if (process.env.NODE_ENV !== "test") {
  cron.schedule("*/10 * * * * *", deleteExpiredTokens);
  console.log("✅ Token cleanup job scheduled to run every 10 seconds.");
}

module.exports = Token;
