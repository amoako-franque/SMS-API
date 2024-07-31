const Admin = require("../model/Staff/Admin")
const Teacher = require("../model/Staff/Teacher")
const verifyToken = require("../utils/verifyToken")

const isTeacherLogin = async (req, res, next) => {
	const headerObj = req.headers
	const token = headerObj?.authorization?.split(" ")[1]
	const verifiedToken = verifyToken(token)
	if (verifiedToken) {
		const user = await Teacher.findById(verifiedToken.id).select(
			"name email role"
		)
		req.userAuth = user
		next()
	} else {
		const err = new Error("Token expired/invalid")
		next(err)
	}
}

module.exports = isTeacherLogin
