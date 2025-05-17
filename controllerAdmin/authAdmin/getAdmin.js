const getAdminById = require("../../service/admin/getAdmin");

const getAdminController = catchAsync(async (req, res) => {
  const id = await getId(req, res);

  try {
    const { code, message, data } = await getAdminById(id);

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


module.exports = getAdminController