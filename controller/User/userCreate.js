const createUserAccount = require("../../service/User/create");

const userCreate = catchAsync(async (req, res) => {
  const { email, password, profileName } = req.body;

  try {
    const { code, message, data } = await createUserAccount({
      email,
      password,
      profileName
    });

    handleResponse(res, code, message, data);
  } catch (error) {
    res.status(statusCodeMap[500]).send({
      message: "Internal Server Error, Contact Dev team"
    });
  }
});

module.exports = userCreate;
