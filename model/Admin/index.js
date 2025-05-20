const mongoose = require("mongoose");

const address = new mongoose.Schema(
  {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { _id: false }
);

const userProfile = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    displayName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  { _id: false }
);

const userProfileImages = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: null,
    },
    backDrop: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: userProfile,
      default: {},
    },
    address: {
      type: address,
      default: {},
    },
    profileImages: {
      type: userProfileImages,
      default: {},
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "moderator"],
      default: "admin",
    },
    lastUpdated: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
