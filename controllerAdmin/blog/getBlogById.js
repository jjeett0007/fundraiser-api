const getBlogById = require("../../service/admin-blog/getBlogById");

const getBlogByIdController = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  try {
    const { code, message, data } = await getBlogById(blogId);
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

module.exports = getBlogByIdController;
