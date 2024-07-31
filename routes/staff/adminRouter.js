const express = require("express")
const {
	registerAdmin,
	loginAdmin,
	fetchAdmins,
	fetchAdminProfile,
	updateAdmin,
	deleteAdmin,
	suspendTeacher,
	cancelSuspension,
	withdrawTeacher,
	publishResults,
	cancelTeacherWithdrawal,
	cancelPublishedResults,
} = require("../../controller/staff/adminController")
const advancedResults = require("../../middlewares/advancedResults")
const isAdmin = require("../../middlewares/isAdmin")
const isLogin = require("../../middlewares/isLogin")
const Admin = require("../../model/Staff/Admin")

const adminRouter = express.Router()

adminRouter.post("/register", registerAdmin)
adminRouter.post("/login", loginAdmin)
adminRouter.get("/", isLogin, advancedResults(Admin), fetchAdmins)
adminRouter.get("/profile", isLogin, isAdmin, fetchAdminProfile)
adminRouter.put("/:adminId", isLogin, isAdmin, updateAdmin)
adminRouter.delete("/:adminId", deleteAdmin)
adminRouter.put("/suspend-teacher/:teacherId", suspendTeacher)
adminRouter.put("/cancel-teacher-suspension/:teacherId", cancelSuspension)
adminRouter.put("/withdraw-teacher/:teacherId", withdrawTeacher)
adminRouter.put(
	"/cancel-teacher-withdrawal/:teacherId",
	cancelTeacherWithdrawal
)
adminRouter.put("/publish-results/:examId", publishResults)
adminRouter.put("/cancel-published-results/:examId", cancelPublishedResults)

module.exports = adminRouter
