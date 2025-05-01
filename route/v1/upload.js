const express = require("express");
const router = express.Router();
const isUserAuthenticated = require("../../middleware/verifyUserToken");
const isAccountVerified = require("../../middleware/accountVerified");

const uploadFile = require("../../controller/uploadFile/fileUpload");

router.post("/file", isUserAuthenticated, isAccountVerified, uploadFile);

module.exports = router;

