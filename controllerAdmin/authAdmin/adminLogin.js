const loginAdmin = require("../../service/admin/loginAdmin");

const loginAdminController = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  try {
    const { code, message, data } = await loginAdmin({
      email,
      password,
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    console.log(error);
    handleResponse(
      res,
      500,
      (message = "Internal Server Error, Contact Dev team"),
      (data = undefined)
    );
  }
});

module.exports = loginAdminController;
