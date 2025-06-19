const updateBlogController = require("./updateBlogById");
const changeBlogStateController = require("./changeBlogStateController");
const createBlogController = require("./createBlogController");
const deleteBlogController = require("./deleteBlogController");
const getAllBlogsController = require("./getAllBlogController");
const getBlogByIdController = require("./getBlogById");
const getBlogStaticsController = require("./blogStatics");

module.exports = {
  updateBlogController,
  changeBlogStateController,
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  getBlogStaticsController
};
