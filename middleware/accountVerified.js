const jwt = require("jsonwebtoken");
const config = require("../config/index");

const User = require("../model/user/user");

const isAccountVerified = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Token is missing" });
  }

  try {
    const { id } = jwt.verify(token, config.jwt.secret);
    const user = await User.findById(id).select("isVerified");

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Please verify your account" });
    }

    next();
  } catch (error) {
    const status =
      error.name === "JsonWebTokenError"
        ? httpStatus.UNAUTHORIZED
        : httpStatus.INTERNAL_SERVER_ERROR;
    return res
      .status(status)
      .json({
        message:
          status === httpStatus.UNAUTHORIZED
            ? "Invalid token"
            : "Internal server error",
      });
  }
};

module.exports = isAccountVerified;
