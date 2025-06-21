const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");

const isUserAuthenticated = require("../../middleware/verifyUserToken");
const isAccountVerified = require("../../middleware/accountVerified");

const {
  getBlogBySlugController,
  getAllBlogsController
} = require("../../controller/blog/index");

const { blogSlugValidation } = require("../../validation/globalValidation");

router.get("/", getAllBlogsController);

router.get("/:slug", validate(blogSlugValidation), getBlogBySlugController);

module.exports = router;
