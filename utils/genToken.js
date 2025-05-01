const jwt = require("jsonwebtoken");
const config = require("../config/index");
const Token = require("../model/token/index");

const jwtSecret = config.jwt.secret;

const generateToken = async (data) => {
  const { type = "access", email, id, role = "user" } = data;
  const userId = id.toString();

  let expiresIn;

  switch (type) {
    case "access":
      expiresIn = config.jwt.accessExpirationMinutes * 60;
      break;
    case "refresh":
      expiresIn = config.jwt.refreshExpirationMinutes * 60;
      break;
    case "reset":
      expiresIn = 300;
      break;
    case "2fa":
      expiresIn = 600;
      break;
    default:
      throw new Error("Invalid token type");
  }

  const token = jwt.sign({ email, id: userId, role }, jwtSecret, { expiresIn });

  await Token.create({
    userId,
    token,
    type,
    role,
    status: type === "reset" || type === "2fa" ? "revoked" : "active",
    expiresAt: new Date(Date.now() + expiresIn * 1000),
  });

  return { access: token, expiresIn };
};

module.exports = generateToken;
