const { Admin } = require("../../model/index");
const getPaginatedData = require("../../utils/paginationQueries");

const getAllAdmin = async ({ page = 1 }) => {
  const filters = {};
  try {
    const getAdmins = await getPaginatedData({
      model: Admin,
      filters: filters,
      limit: 10,
      page: page,
      includeUser: false,
      exclude: []
    });

    return getAdmins
  } catch (error) {
    return error;
  }
};

module.exports = getAllAdmin;
