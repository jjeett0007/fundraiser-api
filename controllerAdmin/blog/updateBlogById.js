const updateBlog = require("../../service/admin-blog/updateBlog");

const updateBlogController = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  try {
    const { code, message, data } = await updateBlog(blogId, req.body);
    handleResponse(res, code, message, data);
  } catch (error) {
    handleResponse(
      res,
      500,
      (message = "Internal Server Error, Contact Dev team"),
      (data = undefined)
    );
  }
});

module.exports = updateBlogController;
