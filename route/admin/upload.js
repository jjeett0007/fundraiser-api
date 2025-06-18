const express = require("express");
const router = express.Router();

const uploadFile = require("../../controller/uploadFile/fileUpload");

router.post("/", uploadFile);

module.exports = router;
