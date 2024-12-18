const verifyToken = require("../utils/verifyToken")

exports.isAuthenticated = (model) => {
	return async (req, res, next) => {
		const authHeader = req.headers
		const token = authHeader?.authorization?.split(" ")[1]

		const verifiedToken = verifyToken(token)
		if (verifiedToken) {
			const user = await model
				.findById(verifiedToken.id)
				.select("name email role")

			req.auth = user
			next()
		} else {
			const err = new Error("Expired Token/Invalid Token")
			next(err)
		}
	}
}
