const express = require("express")
const {
	createSubject,
	updateSubjectById,
	deleteSubjectById,
	fetchSubjectById,
	fetchSubjects,
} = require("../../controller/academics/subjectsController")

const isAdmin = require("../../middlewares/isAdmin")
const isLogin = require("../../middlewares/isLogin")

const subjectRouter = express.Router()

subjectRouter.post("/:programId", isLogin, isAdmin, createSubject)
subjectRouter.get("/", isLogin, isAdmin, fetchSubjects)
subjectRouter.get("/:id", isLogin, isAdmin, fetchSubjectById)
subjectRouter.put("/:id", isLogin, isAdmin, updateSubjectById)
subjectRouter.delete("/:id", isLogin, isAdmin, deleteSubjectById)

module.exports = subjectRouter
