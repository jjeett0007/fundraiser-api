const { Blog } = require("../../model/index");

const createNewBlog = async (userId, data) => {
  console.log(data.contentJson);
  try {
    await Blog.create({ ...data, createdBy: userId });

    return {
      code: 200,
      message: "Blog Created"
    };
  } catch (error) {
    return {
      code: 500,
      message: "error",
      data: error
    };
  }
};

module.exports = createNewBlog;
