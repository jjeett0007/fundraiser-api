const createAdmin = require("../../service/admin/createAdmin");

const createAdminController = catchAsync(async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const { code, message, data } = await createAdmin({
      email,
      password,
      name,
      role,
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    console.log(error)
    handleResponse(
      res,
      500,
      (message = "Internal Server Error, Contact Dev team"),
      (data = undefined)
    );
  }
});

module.exports = createAdminController;
