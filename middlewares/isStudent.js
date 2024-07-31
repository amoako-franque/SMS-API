const Student = require("../model/Academic/Student")

const isStudent = async (req, res, next) => {
	const userId = req?.userAuth?._id
	const student = await Student.findById(userId)
	if (student?.role === "student") {
		next()
	} else {
		next(new Error("Access Denied, Student only"))
	}
}

module.exports = isStudent
