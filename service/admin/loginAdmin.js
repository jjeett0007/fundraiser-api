const { Admin } = require("../../model/index");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/genToken");


async function loginAdmin(data) {
    const { email, password } = data
    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return {
                code: 404,
                message: "Account not found"
            }
        }

        // Use bcrypt to compare the password
        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            return {
                code: 403,
                message: "Incorrect Password"
            }
        }

        // Update lastLogin to current date and time
        admin.lastLogin = new Date();
        await admin.save();

        const token = await generateToken({
            id: admin._id.toString(),
            email: admin.email,
            role: admin.role,
            type: "access"
        });

        // Return admin data (omit sensitive info as needed)
        return {
            code: 201,
            data: {
                id: admin._id.toString(),
                email: admin.email,
                token
            }
        };
    } catch (error) {
        console.error(error);
        return { code: 500, message: "Internal Server Error", error };
    }
}

module.exports = { loginAdmin };
