const jwt = require("jsonwebtoken")

const verifyToken = (token) => {
	return jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
		if (err) {
			console.log({ error: err.message })
			return false
		} else {
			return decoded
		}
	})
}

module.exports = verifyToken
