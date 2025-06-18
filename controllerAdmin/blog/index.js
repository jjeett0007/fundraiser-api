const updateBlogController = require("./updateBlogById");
const changeBlogStateController = require("./changeBlogStateController");
const createBlogController = require("./createBlogController");
const deleteBlogController = require("./deleteBlogController");
const getAllBlogsController = require("./getAllBlogController");
const getBlogByIdController = require("./getBlogById");

module.exports = {
  updateBlogController,
  changeBlogStateController,
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController
};
