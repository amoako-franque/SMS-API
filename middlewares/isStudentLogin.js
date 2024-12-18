const Student = require("../model/Academic/Student")
const verifyToken = require("../utils/verifyToken")

const isStudentLogin = async (req, res, next) => {
	const authHeader = req.headers
	const token = authHeader?.authorization?.split(" ")[1]

	const verifiedToken = verifyToken(token)
	if (verifiedToken) {
		const user = await Student.findById(verifiedToken.id).select(
			"name email role"
		)
		req.auth = user
		next()
	} else {
		const err = new Error("Expired Token/Invalid Token")
		next(err)
	}
}

module.exports = isStudentLogin
