const { Blog } = require("../../model/index");

const deleteBlog = async (userId, blogId) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return {
        code: 404,
        message: "Blog not Found"
      };
    }
    return {
      code: 200,
      message: "Blog Deleted"
    };
  } catch (error) {
    throw error;
  }
};

module.exports = deleteBlog;
