const Admin = require("../model/Staff/Admin")
const verifyToken = require("../utils/verifyToken")

const isLogin = async (req, res, next) => {
	const headerObj = req.headers
	const token = headerObj?.authorization?.split(" ")[1]

	const verifiedToken = verifyToken(token)
	if (verifiedToken) {
		const user = await Admin.findById(verifiedToken.id).select(
			"name email role"
		)
		req.userAuth = user
		next()
	} else {
		const err = new Error("Token expired/invalid")
		next(err)
	}
}

module.exports = isLogin
