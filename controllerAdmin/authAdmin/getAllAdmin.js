const getAllAdmin = require("../../service/admin/getAllAdmin");

const getAllAdminController = catchAsync(async (req, res) => {
  const { page } = req.query;
  try {
    const { code, message, data } = await getAllAdmin({ page });

    handleResponse(res, code, message, data);
  } catch (error) {
    handleResponse(
      res,
      500,
      (message = "Internal Server Error, Contact Dev team"),
      (data = undefined)
    );
  }
});

module.exports = getAllAdminController;