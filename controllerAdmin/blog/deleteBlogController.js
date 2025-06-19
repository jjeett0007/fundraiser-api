const deleteBlog = require("../../service/admin-blog/deleteBlog");

const deleteBlogController = catchAsync(async (req, res) => {
  const userId = await getId(req, res);
  const { blogId } = req.params;
  try {
    const { code, message, data } = await deleteBlog(userId, blogId);
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

module.exports = deleteBlogController;
