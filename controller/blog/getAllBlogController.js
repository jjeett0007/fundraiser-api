const getAllBlogs = require("../../service/blogs/getBlogs");

const getAllBlogsController = catchAsync(async (req, res) => {
  try {
    const { code, message, data } = await getAllBlogs(req.query);
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

module.exports = getAllBlogsController;
