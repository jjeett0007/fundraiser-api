const { Blog } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getAllBlogs = async (query) => {
  const filters = {
    publishNow: true
  };

  try {
    const blogs = await getPaginatedData({
      model: Blog,
      filters: filters,
      page: query.page || 1,
      limit: 9,
      includeUser: false,
      exclude: [
        "createdBy",
        "_id",
        "content",
        "tags",
        "metaDescription",
        "keywords",
        "contentJson",
        "contentHtml"
      ]
    });

    return blogs;
  } catch (error) {
    return {
      code: 500,
      message: "Error"
    };
  }
};

module.exports = getAllBlogs;
