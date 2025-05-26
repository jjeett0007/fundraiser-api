const express = require("express");
const auth = require("./auth");
const fundraise = require("./fundraise");
const adminDb = require("./admin-db")
const users = require("./users");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: auth,
  },
  {
    path: "/fundraise",
    route: fundraise,
  },
  {
    path: "/user",
    route: adminDb
  },
  {
    path: "/users",
    route: users
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
