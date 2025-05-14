const { Admin } = require("../../model/index");

async function getAdminById(adminId) {
    try {
        const admin = await Admin.findById(adminId).select("role lastLogin profile email _id");
        return {
            code: 200,
            data: admin
        };
    } catch (error) {
        return error
    }
}

module.exports = getAdminById;
