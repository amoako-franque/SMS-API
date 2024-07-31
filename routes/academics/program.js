const express = require("express")
const {
	createProgram,
	addSubjectToProgram,
	fetchPrograms,
	fetchProgramById,
	updateProgramById,
	deleteProgramById,
} = require("../../controller/academics/programsController")
const isAdmin = require("../../middlewares/isAdmin")
const isLogin = require("../../middlewares/isLogin")

const programRouter = express.Router()

programRouter.post("/", isLogin, isAdmin, createProgram)
programRouter.get("/", isLogin, isAdmin, fetchPrograms)
programRouter.get("/:id", isLogin, isAdmin, fetchProgramById)
programRouter.put("/:id", isLogin, isAdmin, updateProgramById)
programRouter.delete("/:id", isLogin, isAdmin, deleteProgramById)
programRouter.put("/:id/subjects", isLogin, isAdmin, addSubjectToProgram)

module.exports = programRouter
