const getBlogBySlug = require("../../service/blogs/getBlogBySlug");

const getBlogBySlugController = catchAsync(async (req, res) => {
  const { slug } = req.params;
  try {
    const { code, message, data } = await getBlogBySlug(slug);
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

module.exports = getBlogBySlugController;
