const createUserAccount = require("../../service/User/create");
const getUserByGoogleId = require("../../service/User/findUserByGoogleid");
const config = require("../../config/index");

const failed = (req, res) =>
  res.redirect(`${config.protocol.frontend_origin}/signin?message=failed`);

const success = async ({ email, id, name, displayName, picture }) => {
  try {
    const info = { email, googleId: id, name, displayName, picture };

    const { code, message, data } = await createUserAccount(info);
    // console.log("Create user response:", { code, message, data });

    if (code === 201) {
      const resp = {
        code: 200,
        type: "signup",
        message: message || "User created successfully",
        data: data
      };

      return resp;
    }

    if (code === 302) {
      const { code, message, data } = await getUserByGoogleId(info);

      const resp = {
        code: code,
        type: "login",
        message: "Authenticated",
        data: data
      };

      return resp;
    }
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Internal Server Error" };
  }
};

module.exports = { failed, success };
