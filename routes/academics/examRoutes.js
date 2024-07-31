const express = require("express")
const {
	createExam,
	fetchExams,
	fetchExamById,
	updateExamById,
} = require("../../controller/academics/examsController")
const isTeacher = require("../../middlewares/isTeacher")
const isTeacherLogin = require("../../middlewares/isTeacherLogin")

const examRouter = express.Router()

examRouter.post("/", isTeacherLogin, isTeacher, createExam)
examRouter.get("/", isTeacherLogin, isTeacher, fetchExams)
examRouter.get("/:id", isTeacherLogin, isTeacher, fetchExamById)
examRouter.put("/:id", isTeacherLogin, isTeacher, updateExamById)

module.exports = examRouter
