const express = require("express");
const router = express.Router();
const validate = require("../../middleware/validate");
const isAdminAuthenticated = require("../../middleware/verifyAdminToken");

const {
  updateBlogController,
  changeBlogStateController,
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  getBlogStaticsController
} = require("../../controllerAdmin/blog/index");

const {
  blogValidation,
  blogUpdateValidation,
  blogIdValidation
} = require("../../validation/globalValidation");

router
  .route("/")
  .post(isAdminAuthenticated, validate(blogValidation), createBlogController)
  .get(isAdminAuthenticated, getAllBlogsController);

router.get("/statics", isAdminAuthenticated, getBlogStaticsController);

router
  .route("/:blogId")
  .get(isAdminAuthenticated, validate(blogIdValidation), getBlogByIdController)
  .patch(
    isAdminAuthenticated,
    validate(blogIdValidation),
    validate(blogUpdateValidation),
    updateBlogController
  )
  .delete(
    isAdminAuthenticated,
    validate(blogIdValidation),
    deleteBlogController
  )
  .put(
    isAdminAuthenticated,
    validate(blogIdValidation),
    changeBlogStateController
  );

module.exports = router;
