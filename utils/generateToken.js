const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
exports.generateToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: "5d" })
}

exports.hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	return await bcrypt.hash(password, salt)
}
exports.isPassMatched = async (password, hash) => {
	return await bcrypt.compare(password, hash)
}
