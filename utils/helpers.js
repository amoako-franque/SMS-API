const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
exports.generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "5d" })
}

exports.isPassMatched = async (password, hash) => {
	return await bcrypt.compare(password, hash)
}
