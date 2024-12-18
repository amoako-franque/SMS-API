const Admin = require("../model/Staff/Admin")
const verifyToken = require("../utils/verifyToken")

exports.isLogin = async (req, res, next) => {
	const authHeader = req.headers
	const token = authHeader?.authorization?.split(" ")[1]

	const verifiedToken = verifyToken(token)
	if (verifiedToken) {
		const user = await Admin.findById(verifiedToken.id).select(
			"name email role"
		)
		req.auth = user
		next()
	} else {
		const err = new Error("Expired Token/Invalid Token")
		next(err)
	}
}

module.exports = isLogin
