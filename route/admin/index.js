const express = require("express");
const auth = require("./auth");
const fundraise = require("./fundraise");

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
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
