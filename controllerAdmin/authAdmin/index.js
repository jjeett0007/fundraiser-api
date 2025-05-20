const createAdminController = require("./adminSignup");
const loginAdminController = require("./adminLogin");
const getAdminController = require("./getAdmin");
const getAllAdminController = require("./getAllAdmin");
const updateAdminController = require("./adminUpdateController");

module.exports = {
  createAdminController,
  loginAdminController,
  getAdminController,
  getAllAdminController,
  updateAdminController,
};
