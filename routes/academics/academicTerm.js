const express = require("express")
const {
	createAcademicTerm,
	fetchAcademicTerms,
	fetchAcademicTermById,
	updateAcademicTermsById,
	deleteAcademicTermById,
} = require("../../controller/academics/academicTermController")

const isAdmin = require("../../middlewares/isAdmin")
const isLogin = require("../../middlewares/isLogin")

const academicTermRouter = express.Router()

academicTermRouter.post("/", isLogin, isAdmin, createAcademicTerm)
academicTermRouter.get("/", isLogin, isAdmin, fetchAcademicTerms)
academicTermRouter.get("/:id", isLogin, isAdmin, fetchAcademicTermById)
academicTermRouter.put("/:id", isLogin, isAdmin, updateAcademicTermsById)
academicTermRouter.delete("/:id", isLogin, isAdmin, deleteAcademicTermById)

module.exports = academicTermRouter
