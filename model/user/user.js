/** @format */

const mongoose = require("mongoose");
const {
  addContact
} = require("../../service/mailerService/resendService/index");

const address = new mongoose.Schema(
  {
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    }
  },
  { _id: false }
);

const userProfile = new mongoose.Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    displayName: {
      type: String
    },
    phoneNumber: {
      type: String
    }
  },
  { _id: false }
);

const userProfileImages = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: null
    },
    backDrop: {
      type: String,
      default: null
    }
  },
  { _id: false }
);

const userStatics = new mongoose.Schema(
  {
    totalRaised: {
      type: Number,
      default: 0
    },
    totalFundRaiseCreated: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const fundRaiseData = new mongoose.Schema(
  {
    totalFundRaisedCreated: {
      type: Number,
      default: 0
    },
    totalFundReceived: {
      type: Number,
      default: 0
    },
    totalFundRaisedDonated: {
      type: Number,
      default: 0
    },
    totalFundRaisedDonors: {
      type: Number,
      default: 0
    },
    totalFundRaisedCreatedByUser: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      required: true
    },
    role: {
      type: String,
      default: "user"
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    appleId: {
      type: String,
      unique: true,
      sparse: true
    },
    password: {
      type: String
    },
    profile: {
      type: userProfile,
      default: {}
    },
    profileImages: {
      type: userProfileImages,
      default: {}
    },
    statics: {
      type: userStatics,
      default: {}
    },
    address: {
      type: address,
      default: {}
    },
    fundRaiseData: {
      type: fundRaiseData,
      default: {}
    },
    isVerified: { type: Boolean, default: false },
    lastUpdated: {
      type: Date,
      default: null
    },
    lastLogin: {
      type: Date,
      default: null
    },
    emailSubscription: {
      type: Boolean,
      default: false
    },
    isActivated: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

userSchema.statics.startMonitoring = async function () {
  const changeStream = this.watch([{ $match: { operationType: "insert" } }]);

  changeStream.on("change", async (change) => {
    const newUser = change.fullDocument;

    await addContact({
      email: newUser.email,
      firstName: newUser.profile.firstName || "",
      lastName: newUser.profile.lastName || ""
    });
  });

  changeStream.on("error", (err) => {
    console.error("⚠️ Change Stream Error:", err);
  });
};

const User = mongoose.model("User", userSchema);
User.startMonitoring();

module.exports = User;
