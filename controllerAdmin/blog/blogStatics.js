const getBlogStatics = require("../../service/admin-blog/blog-statics");

const getBlogStaticsController = catchAsync(async (req, res) => {
  try {
    const { code, message, data } = await getBlogStatics();
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

module.exports = getBlogStaticsController;
