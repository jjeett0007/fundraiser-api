const jwt = require("jsonwebtoken");
const config = require("../config/index");
const User = require("../model/user/user");
const Token = require("../model/token/index");

const jwtSecret = config.jwt.secret;

const isUserAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No Token Provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { id: userId, exp } = decoded;

    if (exp && Math.floor(Date.now() / 1000) > exp) {
      return res.status(403).json({ message: "Token Expired" });
    }

    const user = await User.findById(userId).select("_id email");

    if (!user) {
      return res.status(404).json({ message: "Invalid User" });
    }

    const storedToken = await Token.findOne({
      token,
      userId,
      status: "active",
    });

    if (!storedToken) {
      return res.status(401).json({ message: "Token Revoked or Invalid" });
    }

    req.decoded = decoded;
    next();
  } catch (error) {
    const errorMessages = {
      TokenExpiredError: { status: 403, message: "Token Expired" },
      JsonWebTokenError: { status: 401, message: "Invalid Token" },
    };

    const response = errorMessages[error.name] || {
      status: 500,
      message: "Internal Server Error, Contact Dev team",
    };

    return res.status(response.status).json({ message: response.message });
  }
};

module.exports = isUserAuthenticated;
