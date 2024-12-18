const Teacher = require("../model/Staff/Teacher")

exports.isTeacher = async (req, res, next) => {
	const userId = req?.auth?._id
	const teacher = await Teacher.findById(userId)

	if (teacher?.role === "teacher") {
		next()
	} else {
		next(new Error("Access Denied, Teachers only"))
	}
}
