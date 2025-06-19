const { Blog } = require("../../model/index");

const getBlogStatics = async () => {
  try {
    const [total, draft, published, totalViews] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({
        status: "draft"
      }),
      Blog.countDocuments({
        status: "published"
      }),
      Blog.aggregate([
        {
          $group: {
            _id: null,
            totalViews: { $sum: "$views" }
          }
        }
      ]).then((result) => result[0]?.totalViews || 0)
    ]);

    return {
      code: 200,
      message: "Success",
      data: {
        total,
        draft,
        published,
        totalViews
      }
    };
  } catch (error) {
    return {
      code: 500,
      message: "Internal server error",
      data: null
    };
  }
};

module.exports = getBlogStatics;
