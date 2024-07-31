const Teacher = require("../model/Staff/Teacher")

const isTeacher = async (req, res, next) => {
	const userId = req?.userAuth?._id
	const teacher = await Teacher.findById(userId)

	if (teacher?.role === "teacher") {
		next()
	} else {
		next(new Error("Access Denied, Teachers only"))
	}
}

module.exports = isTeacher
