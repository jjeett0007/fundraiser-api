const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const config = require("../config/index");

const jwtSecret = config.jwt.secret;

const getId = async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const userId = decodedToken.id;

    if (!userId) {
      return res.status(httpStatus.NOT_FOUND).send({
        message: "Invalid User",
      });
    } else {
      return userId;
    }
  } catch (error) {
    return "";
  }
};

module.exports = getId;
