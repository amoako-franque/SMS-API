const Admin = require("../model/Staff/Admin")

const isAdmin = async (req, res, next) => {
	const userId = req?.userAuth?._id
	const admin = await Admin.findById(userId)
	if (admin?.role === "admin") {
		next()
	} else {
		next(new Error("Access Denied, admin only"))
	}
}

module.exports = isAdmin
