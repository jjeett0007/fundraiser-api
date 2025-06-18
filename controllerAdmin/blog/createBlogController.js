const createNewBlog = require("../../service/admin-blog/createBlog");

const createBlogController = catchAsync(async (req, res) => {
  const userId = await getId(req, res);
  try {
    const { code, message, data } = await createNewBlog(userId, req.body);
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

module.export = createBlogController;
