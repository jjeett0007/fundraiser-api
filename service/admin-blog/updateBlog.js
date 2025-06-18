const { Blog } = require("../../model/index");

const updateBlog = async (id, data) => {
  const {
    title,
    slug,
    excerpt,
    featuredImage,
    contentJson,
    contentHtml,
    tags,
    category
  } = data;
  try {
    const updateFields = {};
    if (title) updateFields.title = title;
    if (slug) updateFields.slug = slug;
    if (excerpt) updateFields.excerpt = excerpt;
    if (featuredImage) updateFields.featuredImage = featuredImage;
    if (contentJson) updateFields.contentJson = contentJson;
    if (contentHtml) updateFields.contentHtml = contentHtml;
    if (tags) updateFields.tags = tags;
    if (category) updateFields.category = category;

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: updateFields
      },
      { new: true }
    );

    if (!blog) {
      return {
        code: 404,
        message: "Blog not found"
      };
    }

    const updatedFields = Object.keys(updateFields).join(", ");
    return {
      code: 200,
      message: `Blog updated successfully. Updated fields: ${updatedFields}`
    };
  } catch (error) {
    return {
      code: 500,
      message: "Error updating Blog"
    };
  }
};

module.exports = updateBlog;
