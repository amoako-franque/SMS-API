const express = require("express")
const {
	registerStudentByAdmin,
	loginStudent,
	fetchStudentProfile,
	fetchAllStudentsByAdmin,
	fetchStudentByAdmin,
	updateProfileByStudent,
	updateStudentProfileByAdmin,
	writeExamByStudent,
} = require("../../controller/students/studentsController")

const isAdmin = require("../../middlewares/isAdmin")
const isLogin = require("../../middlewares/isLogin")
const isStudent = require("../../middlewares/isStudent")
const isStudentLogin = require("../../middlewares/isStudentLogin")
const studentRouter = express.Router()

studentRouter.post("/admin/register", isLogin, isAdmin, registerStudentByAdmin)
studentRouter.post("/login", loginStudent)
studentRouter.get("/profile", isStudentLogin, isStudent, fetchStudentProfile)
studentRouter.get("/admin", isLogin, isAdmin, fetchAllStudentsByAdmin)
studentRouter.get("/:studentID/admin", isLogin, isAdmin, fetchStudentByAdmin)

studentRouter.post(
	"/exam/:examID/write",
	isStudentLogin,
	isStudent,
	writeExamByStudent
)

studentRouter.put("/update", isStudentLogin, isStudent, updateProfileByStudent)
studentRouter.put(
	"/:studentID/update/admin",
	isLogin,
	isAdmin,
	updateStudentProfileByAdmin
)
module.exports = studentRouter
