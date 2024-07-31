const express = require("express")
const {
	createQuestion,
	updateQuestionById,
	fetchQuestionById,
	fetchQuestions,
} = require("../../controller/academics/questionsController")
const isTeacher = require("../../middlewares/isTeacher")
const isTeacherLogin = require("../../middlewares/isTeacherLogin")

const questionsRouter = express.Router()

questionsRouter.get("/", isTeacherLogin, isTeacher, fetchQuestions)
questionsRouter.get("/:id", isTeacherLogin, isTeacher, fetchQuestionById)
questionsRouter.post("/:examID", isTeacherLogin, isTeacher, createQuestion)
questionsRouter.put("/:id", isTeacherLogin, isTeacher, updateQuestionById)

module.exports = questionsRouter
