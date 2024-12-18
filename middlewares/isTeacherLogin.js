const Admin = require("../model/Staff/Admin")
const Teacher = require("../model/Staff/Teacher")
const verifyToken = require("../utils/verifyToken")

exports.isTeacherLogin = async (req, res, next) => {
	const authHeader = req.headers
	const token = authHeader?.authorization?.split(" ")[1]
	const verifiedToken = verifyToken(token)
	if (verifiedToken) {
		const user = await Teacher.findById(verifiedToken.id).select(
			"name email role"
		)
		req.auth = user
		next()
	} else {
		const err = new Error("Expired Token/Invalid Token")
		next(err)
	}
}
