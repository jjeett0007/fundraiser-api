const createUserAccount = require("../../service/User/create");
const getUserByGoogleId = require("../../service/User/findUserByGoogleid");
const config = require("../../config/index");

const failed = (req, res) =>
  res.redirect(`${config.protocol.frontend_origin}/signin?message=failed`);

const success = async ({ email, id, name, displayName, picture }) => {
  try {
    const info = { email, googleId: id, name, displayName, picture };
    const create = await createUserAccount(info);

    if (create.code === 200) {
      return {
        code: 200,
        type: "signup",
        message: "Sign up successful",
        data: create.data
      };
    }

    if (create.code === 302) {
      const { code, message, data } = await getUserByGoogleId(info);

      return {
        code: code,
        type: "login",
        message: "Authenticated",
        data: data
      };
    }
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Internal Server Error" };
  }
};

module.exports = { failed, success };
