const express = require("express")
const {
	createAcademicYear,
	fetchAcademicYears,
	fetchAcademicYearById,
	updateAcademicYearById,
	deleteAcademicYearById,
} = require("../../controller/academics/academicYearController")
const isAdmin = require("../../middlewares/isAdmin")
const isLogin = require("../../middlewares/isLogin")

const academicYearRouter = express.Router()

academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear)
academicYearRouter.get("/", isLogin, isAdmin, fetchAcademicYears)
academicYearRouter.get("/:id", isLogin, isAdmin, fetchAcademicYearById)
academicYearRouter.put("/:id", isLogin, isAdmin, updateAcademicYearById)
academicYearRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYearById)

module.exports = academicYearRouter
