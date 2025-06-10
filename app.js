require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const advancedRateLimiter = require("./middleware/rateLimiter");
const activityLogger = require("./middleware/activityLogMiddleware");

global.router = express.Router();
global.catchAsync = require("./utils/catchAsync");
global.getId = require("./utils/getId");
global.statusCodeMap = require("./utils/statusCode");
global.formatResponse = require("./utils/responseFormatter");
global.handleResponse = require("./utils/handleResponse");
global.httpStatus = require("http-status");

const config = require("./config/index");
const routes = require("./route/v1/index");
const adminRoutes = require("./route/admin/index");

require("./lib/firebase");
require("./lib/smtp");
require("./lib/solana-block-service");
const { connectToDatabase } = require("./lib/database");

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

app.use(
  session({
    secret: "myBigSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

if (config.env !== "prod" && config.env !== "test") {
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => {
          // Log to a file or external service
          console.log(message.trim());
        }
      }
    })
  );
}

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectToDatabase();

app.use((req, res, next) => {
  // console.log(`Request size: ${req.headers['content-length']} bytes`);
  // console.log(`Headers:`, req.headers);
  next();
});

const globalLimiter = advancedRateLimiter({
  window: "15m",
  max: 100,
  keyGenerator: (req) => req.ip
});

app.use(activityLogger);

app.use(globalLimiter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/v1", routes);
app.use("/admin", adminRoutes);

module.exports = app;
