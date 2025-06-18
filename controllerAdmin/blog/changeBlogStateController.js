const changeBlogState = require("../../service/admin-blog/blogState");

const changeBlogStateController = catchAsync(async (req, res) => {
  const userId = await getId(req, res);
  const { blogId } = req.params;
  try {
    const { code, message, data } = await changeBlogState(
      userId,
      blogId,
      req.body
    );
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

module.export = changeBlogStateController;
