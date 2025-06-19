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
        "slug",
        "content",
        "tags",
        "metaDescription",
        "featuredImage",
        "keywords",
        "contentJson",
        "contentHtml",
        "createdAt",
        "__v"
      ],
      populate: [
        {
          path: "createdBy",
          select:
            "-_id profile.firstName profile.lastName profile.displayName profileImages"
        }
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
