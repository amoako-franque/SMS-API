const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const Admin = require("../../model/Staff/Admin")
const generateToken = require("../../utils/generateToken")
const verifyToken = require("../../utils/verifyToken")
const { hashPassword, isPassMatched } = require("../../utils/helpers")
const Teacher = require("../../model/Staff/Teacher")
const Exam = require("../../model/Academic/Exam")

exports.registerAdmin = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const user = await Admin.findOne({ email })
	if (user) {
		throw new Error("Admin Exists")
	}

	const admin = await Admin.create({
		name,
		email,
		password: await hashPassword(password),
	})
	res.status(201).json({
		status: "success",
		data: admin,
		message: "Admin registered successfully",
	})
})

exports.loginAdmin = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await Admin.findOne({ email })
	if (!user) {
		return res.json({ message: "Invalid login credentials" })
	}

	const isMatched = await isPassMatched(password, user.password)

	if (!isMatched) {
		return res.json({ message: "Invalid login credentials" })
	} else {
		return res.json({
			data: generateToken(user._id),
			message: "Admin logged in successfully",
		})
	}
})

exports.fetchAdmins = asyncHandler(async (req, res) => {
	try {
		const admins = await Admin.find()

		return res.status(200).json({ admins })
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while fetching all admins" })
	}
})

exports.fetchAdminProfile = asyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.userAuth._id)
		.select("-password -createdAt -updatedAt")
		.populate("academicYears")
		.populate("academicTerms")
		.populate("programs")
		.populate("yearGroups")
		.populate("classLevels")
		.populate("teachers")
		.populate("students")
	if (!admin) {
		throw new Error("Admin Not Found")
	} else {
		res.status(200).json({
			status: "success",
			data: admin,
			message: "Admin Profile fetched  successfully",
		})
	}
})

exports.updateAdmin = asyncHandler(async (req, res) => {
	const { email, name, password } = req.body

	const emailExist = await Admin.findOne({ email })
	if (emailExist) {
		throw new Error("This email is taken/exist")
	}

	if (password) {
		const admin = await Admin.findByIdAndUpdate(
			req.userAuth._id,
			{
				email,
				password: await hashPassword(password),
				name,
			},
			{
				new: true,
				runValidators: true,
			}
		)
		res.status(200).json({
			status: "success",
			data: admin,
			message: "Admin updated successfully",
		})
	} else {
		const admin = await Admin.findByIdAndUpdate(
			req.userAuth._id,
			{
				email,
				name,
			},
			{
				new: true,
				runValidators: true,
			}
		)
		res.status(200).json({
			status: "success",
			data: admin,
			message: "Admin updated successfully",
		})
	}
})

exports.deleteAdmin = asyncHandler(async (req, res) => {
	try {
		const { adminId } = req.params

		await Admin.findByIdAndDelete(adminId)

		return res.status(200).json({ message: "Admin deleted successfully" })
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while deleting the admin" })
	}
})

exports.suspendTeacher = asyncHandler(async (req, res) => {
	const { reason } = req.body

	const { teacherId } = req.params

	if (!teacherId) {
		return res.status(400).json({ message: "Teacher ID is required" })
	}

	try {
		const teacher = await Teacher.findOne({ teacherId })

		if (!teacher) {
			return res.status(404).json({ message: "Teacher not found" })
		}

		if (teacher.isSuspended) {
			return res.status(400).json({ message: "Teacher is already suspended" })
		}

		teacher.isSuspended = true
		teacher.reasonForSuspension = reason
		await teacher.save()

		return res.status(200).json({ message: "Teacher suspended successfully" })
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while suspending the teacher" })
	}
})

exports.cancelSuspension = asyncHandler(async (req, res) => {
	const { teacherId } = req.params

	if (!teacherId) {
		return res.status(400).json({ message: "Teacher ID is required" })
	}

	try {
		const teacher = await Teacher.findOne({ teacherId })

		if (!teacher) {
			return res.status(404).json({ message: "Teacher not found" })
		}

		if (!teacher.isSuspended) {
			return res.status(400).json({ message: "Teacher is not suspended" })
		}

		teacher.isSuspended = false
		teacher.reasonForSuspension = null
		await teacher.save()

		return res
			.status(200)
			.json({ message: "Teacher suspension canceled successfully" })
	} catch (error) {
		return res.status(500).json({
			message:
				"An error occurred while canceling the suspension of the teacher",
		})
	}
})

exports.publishResults = asyncHandler(async (req, res) => {
	try {
		const { results } = req.body
		const { examId } = req.params

		if (!examId) {
			return res.status(400).json({ message: "Exam ID is required" })
		}

		const exam = await Exam.findById(examId)
		if (!exam) {
			return res.status(404).json({ message: "Exam not found" })
		}

		exam.results = results
		exam.isPublished = true
		await exam.save()

		return res
			.status(200)
			.json({ message: "Student results published successfully" })
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while publishing student results" })
	}
})

exports.cancelPublishedResults = asyncHandler(async (req, res) => {
	try {
		const { examId } = req.params

		if (!examId) {
			return res.status(400).json({ message: "Exam ID is required" })
		}

		const exam = await Exam.findById(examId)
		if (!exam) {
			return res.status(404).json({ message: "Exam not found" })
		}

		exam.results = []
		exam.isPublished = false
		await exam.save()

		return res
			.status(200)
			.json({ message: "Published results canceled successfully" })
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while canceling published results" })
	}
})

exports.withdrawTeacher = asyncHandler(async (req, res) => {
	try {
		const { teacherId } = req.params

		if (!teacherId) {
			return res.status(400).json({ message: "Teacher ID is required" })
		}

		const teacher = await Teacher.findOne({ teacherId })
		if (!teacher) {
			return res.status(404).json({ message: "Teacher not found" })
		}

		teacher.isWithdrawn = true
		await teacher.save()

		return res.status(200).json({ message: "Teacher withdrawn successfully" })
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while withdrawing the teacher" })
	}
})

exports.cancelTeacherWithdrawal = asyncHandler(async (req, res) => {
	try {
		const { teacherId } = req.params

		if (!teacherId) {
			return res.status(400).json({ message: "Teacher ID is required" })
		}

		const teacher = await Teacher.findOne({ teacherId })
		if (!teacher) {
			return res.status(404).json({ message: "Teacher not found" })
		}

		teacher.isWithdrawn = false
		await teacher.save()

		return res
			.status(200)
			.json({ message: "Teacher withdrawal canceled successfully" })
	} catch (error) {
		return res
			.status(500)
			.json({ message: "An error occurred while canceling teacher withdrawal" })
	}
})
