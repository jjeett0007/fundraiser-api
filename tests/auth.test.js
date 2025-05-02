const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { connectToDatabase } = require("../lib/database");

const testUser = {
  email: `user${Date.now()}@test.com`,
  password: "test@password123",
  updatePassword: "Update@password456",
  newPassword: "NeW@password4569",
  profileName: {
    firstName: "Optimus",
    lastName: "Prime",
    displayName: "Primate"
  },
  profileImages: {
    avatar:
      "https://res.cloudinary.com/ddhwvds38/image/upload/v1741362007/uploads/glrzqzt7cmxzpo5vgq9z.jpg",
    backDrop: null
  },
  address: {
    city: "White House",
    country: "USA",
    state: "Washington DC"
  }
};

let accessToken;

beforeAll(async () => {
  await connectToDatabase();

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Database connection timeout"));
    }, 25000);

    mongoose.connection.once("open", () => {
      clearTimeout(timeout);
      resolve();
    });

    mongoose.connection.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}, 30000);

afterAll(async () => {
  try {
    // Check connection state
    if (mongoose.connection.readyState !== 1) {
      console.log("Database not connected, cannot clean up");
      return;
    }

    // Log before deletion
    console.log(`Attempting to delete test user: ${testUser.email}`);

    // Delete user
    const result = await mongoose.models.User.deleteOne({
      email: testUser.email
    });

    console.log(`Deleted ${result.deletedCount} users via User model`);

    // Disconnect
    await mongoose.disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.error("Error in afterAll:", error);
    // Still try to disconnect
    try {
      await mongoose.disconnect();
    } catch (e) {
      console.error("Error disconnecting:", e);
    }
  }
}, 10000); // 10 second timeout

describe("Auth Flow", () => {
  it("should sign up a user", async () => {
    console.log(`Attempting to create test user: ${testUser.email}`);

    const res = await request(app)
      .post("/v1/auth/sign-up")
      .send({
        email: testUser.email,
        password: testUser.password,
        profileName: {
          firstName: testUser.profileName.firstName,
          lastName: testUser.profileName.lastName
        }
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("OTP Sent to your email");

    const data = res.body.data;
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("email", testUser.email);
    expect(data.token).toHaveProperty("access");
    expect(data.token).toHaveProperty("expiresIn");
  });

  it("should sign in the user and respond with verification notice", async () => {
    const res = await request(app).post("/v1/auth/sign-in").send({
      email: testUser.email,
      password: testUser.password
    });

    expect([200, 203]).toContain(res.statusCode);

    const data = res.body.data;

    expect([
      "Login Successful, Please Verify your account",
      "Login Successful, Verified"
    ]).toContain(res.body.message);

    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("email", testUser.email);
    expect(data.token).toHaveProperty("access");
    expect(data.token).toHaveProperty("expiresIn");

    accessToken = data.token.access;
  });
});

describe("OTP Verification Flow", () => {
  let otpCode;

  beforeAll(async () => {
    // Retrieve the OTP from the DB (or mock it if you're using a test service)
    const OtpModels = mongoose.models.Otp;
    const user = await OtpModels.findOne({ email: testUser.email });

    if (!user || !user.otp) {
      throw new Error("OTP code not found for test user");
    }

    otpCode = user.otp;
  });

  it("should resend otp code", async () => {
    const res = await request(app)
      .get("/v1/otp/resend")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("OTP sent to your mail");
  });

  it("should verify the OTP for the user", async () => {
    const res = await request(app)
      .post("/v1/otp/verify")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ otpCode });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("VERIFIED");
  });
});

describe("User Flow", () => {
  it("should update the user's profile and address", async () => {
    const updatePayload = {
      profileInfo: {
        firstName: testUser.profileName.firstName,
        lastName: testUser.profileName.lastName,
        displayName: testUser.profileName.displayName,
        phoneNumber: "+1234567890"
      },
      avatar: testUser.profileImages.avatar,
      address: {
        country: testUser.address.country,
        state: testUser.address.state,
        city: testUser.address.city
      }
    };

    const res = await request(app)
      .patch("/v1/user")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(updatePayload);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User successfully updated.");
  });

  it("should return the user data with correct structure", async () => {
    const response = await request(app)
      .get("/v1/user")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    const data = response.body.data;

    // Structure checks
    expect(data).toHaveProperty("_id");
    expect(data).toHaveProperty("email", testUser.email);
    expect(data.profile).toHaveProperty("firstName");
    expect(data.profile).toHaveProperty("lastName");
    expect(data.profile).toHaveProperty("displayName");
    expect(data.profileImages).toHaveProperty("avatar");
    expect(data.address).toHaveProperty("city");
    expect(data.address).toHaveProperty("country");
    expect(data.address).toHaveProperty("state");

    // Data value checks
    expect(data.profile.firstName).toBe(testUser.profileName.firstName);
    expect(data.profile.lastName).toBe(testUser.profileName.lastName);
    expect(data.profile.displayName).toBe(testUser.profileName.displayName);
    expect(data.profileImages.avatar).toBe(testUser.profileImages.avatar);
    expect(data.address.city).toBe(testUser.address.city);
    expect(data.address.country).toBe(testUser.address.country);
    expect(data.address.state).toBe(testUser.address.state);
  });
});

describe("Password Reset Flow", () => {
  let resetToken;

  it("should request a password reset OTP", async () => {
    const res = await request(app)
      .post("/v1/password/forgot")
      .send({ email: testUser.email });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password reset link sent to your email");

    const result = await mongoose.models.User.findOne({
      email: testUser.email
    });

    const getToken = await mongoose.models.Token.findOne({
      userId: result._id.toString(),
      type: "reset",
      status: "revoked",
      role: "user"
    });

    expect(getToken).toBeTruthy();
    resetToken = getToken.token;
  });

  it("should update the password from old to new password", async () => {
    const res = await request(app)
      .put("/v1/password/update")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        oldPassword: testUser.password,
        newPassword: testUser.updatePassword
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password updated successfully");
  });

  it("should change the password", async () => {
    const res = await request(app).patch("/v1/password/reset").send({
      token: resetToken,
      newPassword: testUser.newPassword
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password reset successfully");
  });
});

describe("Waitlist Flow", () => {
  it("should add the user to the waitlist", async () => {
    const res = await request(app)
      .post("/v1/waitlist/join")
      .send({ email: testUser.email });

    console.log(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Added to waitlist successfully");
  });
});
