const { Admin } = require("../../model/index");
const bcrypt = require("bcrypt");

async function createAdmin({ email, password, name, role }) {
  try {
    const existingAdmin = await Admin.findOne({ email }, { _id: 1 });
    if (existingAdmin) {
      return {
        code: 302,
        message: "Account Exist",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    await Admin.create({
      email,
      password: hashedPassword,
      profile: {
        displayName: name,
      },
      role,
    });

    return {
      code: 200,
      message: "Admin created",
    };
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Internal Server Error", error };
  }
}

module.exports = createAdmin;
