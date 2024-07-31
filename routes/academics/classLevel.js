const express = require("express")
const {
	createClassLevel,
	deleteClassLevelById,
	updateClassLevelById,
	fetchClassLevelById,
} = require("../../controller/academics/classLevelController")

const isAdmin = require("../../middlewares/isAdmin")
const isLogin = require("../../middlewares/isLogin")

const classLevelRouter = express.Router()

classLevelRouter.post("/", isLogin, isAdmin, createClassLevel)
classLevelRouter.get("/", isLogin, isAdmin, fetchClassLevelById)
classLevelRouter.get("/:id", isLogin, isAdmin, fetchClassLevelById)
classLevelRouter.put("/:id", isLogin, isAdmin, updateClassLevelById)
classLevelRouter.delete("/:id", isLogin, isAdmin, deleteClassLevelById)

module.exports = classLevelRouter
