const Admin = require("../model/Staff/Admin")

exports.isAdmin = async (req, res, next) => {
	const userId = req?.auth?._id
	const admin = await Admin.findById(userId)
	if (admin?.role === "admin") {
		next()
	} else {
		next(new Error("Access Denied, admin only"))
	}
}
