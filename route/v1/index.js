const express = require("express");
const auth = require("./auth");
const otp = require("./otp");
const userRouter = require("./user");
const googleOauth = require("./googleOauth");
const upload = require("./upload");

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
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
