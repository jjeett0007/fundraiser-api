const express = require("express");
const auth = require("./auth");
const otp = require("./otp");
const userRouter = require("./user");
const googleOauth = require("./googleOauth");
const upload = require("./upload");
const password = require("./password");
const waitList = require("./waitlist");
const fundRaise = require("./fundraise");
const hookesLaw = require("./hooks");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: auth
  },
  {
    path: "/otp",
    route: otp
  },
  {
    path: "/password",
    route: password
  },
  {
    path: "/fundraise",
    route: fundRaise
  },
  {
    path: "/user",
    route: userRouter
  },
  {
    path: "/googleOauth",
    route: googleOauth
  },
  {
    path: "/upload",
    route: upload
  },
  {
    path: "/waitlist",
    route: waitList
  },
  {
    path: "/hooks",
    route: hookesLaw
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
