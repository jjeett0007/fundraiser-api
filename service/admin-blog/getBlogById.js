const { Blog } = require("../../model/index");

const getBlogById = async (id) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { new: true }
    ).select("-createdBy");

    if (!blog) {
      return {
        code: 404,
        message: "Blog not found"
      };
    }

    return {
      code: 200,
      data: blog
    };
  } catch (error) {
    return {
      code: 500,
      message: "Error"
    };
  }
};

module.exports = getBlogById;
