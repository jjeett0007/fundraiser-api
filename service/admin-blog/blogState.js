const { Blog } = require("../../model/index");

const changeBlogState = async (blogId, body) => {
  const { status } = body;
  try {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $set: {
          publishNow: status === "published" ? true : false,
          status: status
        }
      },
      { new: true }
    );

    if (!blog) {
      return {
        code: 404,
        message: "Blog not found"
      };
    }

    return {
      code: 200,
      message: `Blog state updated successfully, Blog publish: ${blog.publishNow}, Blog status: ${blog.status}`
    };
  } catch (error) {
    return {
      code: 500,
      message: "error",
      data: error
    };
  }
};

module.exports = changeBlogState;
