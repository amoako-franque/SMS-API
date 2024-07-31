const express = require("express")
const {
	createYearGroup,
	fetchYearGroups,
	fetchYearGroupById,
	updateYearGroupById,
	deleteYearGroupById,
} = require("../../controller/academics/yearGroupsCotroller")

const isAdmin = require("../../middlewares/isAdmin")
const isLogin = require("../../middlewares/isLogin")

const yearGroupRouter = express.Router()

yearGroupRouter.post("/", isLogin, isAdmin, createYearGroup)
yearGroupRouter.get("/", isLogin, isAdmin, fetchYearGroups)
yearGroupRouter.get("/:id", isLogin, isAdmin, fetchYearGroupById)
yearGroupRouter.put("/:id", isLogin, isAdmin, updateYearGroupById)
yearGroupRouter.delete("/:id", isLogin, isAdmin, deleteYearGroupById)

module.exports = yearGroupRouter
