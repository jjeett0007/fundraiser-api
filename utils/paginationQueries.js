const deleteNestedKeys = require("./deleteNestedKey");

const getPaginatedData = async ({
  model,
  filters = {},
  page = 1,
  limit = 10,
  includeUser = false,
  populateFields = null,
  exclude = [],
  sortBy = "-createdAt",
  populate = []
}) => {
  try {
    if (page < 1) {
      return {
        code: 404,
        message: "Page number cannot be less than 1"
      };
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    let query = model.find(filters).sort(sortBy).skip(skip).limit(limitNumber);

    if (includeUser) {
      query = query.populate(
        "createdBy",
        "_id "
      );
    } else if (populateFields && populateFields.trim() !== "") {
      let fields = populateFields.split(" ");
      fields = fields.filter((field) => field !== "password");
      const populateString = fields.join(" ");
      if (populateString.trim() !== "") {
        query = query.populate("createdBy", populateString);
      }
    }

    if (populate && populate.length > 0) {
      populate.forEach((field) => {
        query = query.populate(field);
      });
    }

    const data = await query;

    if (!data || data.length === 0) {
      return {
        code: 200,
        message: "No data found",
        data: {
          results: [],
          pagination: {
            totalItems: 0,
            currentPage: 0,
            totalPages: 0,
            pageSize: 0
          }
        }
      };
    }

    const filteredResults = data.map((item) => {
      const obj = item.toObject();
      deleteNestedKeys(obj, exclude);
      return obj;
    });

    const totalCount = await model.countDocuments(filters);

    return {
      code: 200,
      message: "Data retrieved successfully",
      data: {
        results: filteredResults || [],
        pagination: {
          totalItems: totalCount,
          currentPage: pageNumber,
          totalPages: Math.ceil(totalCount / limitNumber),
          pageSize: limitNumber
        }
      }
    };
  } catch (error) {
    return {
      code: 500,
      message: "An error occurred while fetching data",
      error: error.message || error
    };
  }
};

module.exports = getPaginatedData;
