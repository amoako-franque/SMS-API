const verifyToken = require("../utils/verifyToken")

const isAuthenticated = (model) => {
	return async (req, res, next) => {
		const headerObj = req.headers
		const token = headerObj?.authorization?.split(" ")[1]

		const verifiedToken = verifyToken(token)
		if (verifiedToken) {
			const user = await model
				.findById(verifiedToken.id)
				.select("name email role")

			req.userAuth = user
			next()
		} else {
			const err = new Error("Token expired/invalid")
			next(err)
		}
	}
}

module.exports = isAuthenticated
