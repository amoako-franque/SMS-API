const express = require("express")
const {
	fetchAllExamResults,
	publishExamResultByAdmin,
	checkExamResultsByStudent,
} = require("../../controller/academics/examResultsController")
const isAdmin = require("../../middlewares/isAdmin")
const isLogin = require("../../middlewares/isLogin")
const isStudent = require("../../middlewares/isStudent")
const isStudentLogin = require("../../middlewares/isStudentLogin")

const examResultRouter = express.Router()

examResultRouter.get("/", isStudentLogin, isStudent, fetchAllExamResults)
examResultRouter.get(
	"/:id/checking",
	isStudentLogin,
	isStudent,
	checkExamResultsByStudent
)

examResultRouter.put(
	"/:id/admin-toggle-publish",
	isLogin,
	isAdmin,
	publishExamResultByAdmin
)
module.exports = examResultRouter
