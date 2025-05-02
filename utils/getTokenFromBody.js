const jwt = require("jsonwebtoken");

const config = require("../config/index");

const jwtSecret = config.jwt.secret;

const getIdFromString = async (token) => {
  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const userId = decodedToken.id;

    if (!userId) {
      return res.status(httpStatus.NOT_FOUND).send({
        message: "Invalid User"
      });
    } else {
      return userId;
    }
  } catch (error) {
    return error;
  }
};

module.exports = getIdFromString;
