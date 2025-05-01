const { User, Otp } = require("../../model/index");
const bcrypt = require("bcrypt");
const generateConfirmationCode = require("../../utils/codeGen");
const generateToken = require("../../utils/genToken");
const sendVerificationEmail = require("../mailerService/sendVerificationEmail");

const createUserAccount = async ({
  email,
  password,
  profileName,
  googleId,
  name,
  displayName,
  picture
}) => {
  try {
    const existingUser = await User.findOne({ email }, { _id: 1 });

    if (existingUser) {
      return {
        code: 302,
        message: "Account with this Email existed"
      };
    }

    const userProfile = googleId
      ? {
          googleId,
          isVerified: true,
          profile: {
            firstName: name.givenName,
            lastName: name.familyName,
            displayName
          },
          profileImages: { avatar: picture }
        }
      : {
          profile: {
            firstName: profileName.firstName,
            lastName: profileName.lastName
          },
          password: await bcrypt.hash(password, 10)
        };

    const newUser = await User.create({
      email,
      ...userProfile
    });

    if (!googleId) {
      const code = generateConfirmationCode();
      await Promise.all([
        Otp.create({
          email: newUser.email,
          otp: code,
          expiresAt: new Date(Date.now() + 2 * 60 * 1000)
        }),
        sendVerificationEmail({ email: newUser.email, code })
      ]);
    }

    const token = await generateToken({
      id: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
      type: "access"
    });

    return {
      code: 200,
      message: googleId
        ? "Account Created Successfully"
        : "OTP Sent to your email",
      data: {
        id: newUser._id.toString(),
        email: newUser.email,
        token
      }
    };
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Internal Server Error", error };
  }
};

module.exports = createUserAccount;
