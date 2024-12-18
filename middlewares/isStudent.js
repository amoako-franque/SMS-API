const Student = require("../model/Academic/Student")

exports.isStudent = async (req, res, next) => {
	const userId = req?.auth?._id
	const student = await Student.findById(userId)
	if (student?.role === "student") {
		next()
	} else {
		next(new Error("Access Denied, Student only"))
	}
}
