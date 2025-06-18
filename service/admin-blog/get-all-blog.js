const { Blog } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getAllBlogs = async (query) => {
  const filters = {};
  if (query.status) {
    filters.status = query.status;
  }

  try {
    const blogs = await getPaginatedData({
      model: Blog,
      filters: filters,
      page: query.page || 1,
      limit: 20,
      includeUser: false,
      exclude: [
        "createdBy",
        "slug",
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
