const asyncHandler = require("express-async-handler")
const Admin = require("../../model/Staff/Admin")
const Teacher = require("../../model/Staff/Teacher")
const generateToken = require("../../utils/generateToken")
const { hashPassword, isPassMatched } = require("../../utils/generateToken")

exports.adminRegisterTeacher = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const adminFound = await Admin.findById(req.auth._id)
	if (!adminFound) {
		throw new Error("Admin not found")
	}

	const teacher = await Teacher.findOne({ email })
	if (teacher) {
		throw new Error("Teacher already employed")
	}

	const hashedPassword = await hashPassword(password)

	const teacherCreated = await Teacher.create({
		name,
		email,
		password: hashedPassword,
	})

	adminFound.teachers.push(teacherCreated?._id)
	await adminFound.save()

	res.status(201).json({
		status: "success",
		message: "Teacher registered successfully",
		data: teacherCreated,
	})
})

exports.loginTeacher = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const teacher = await Teacher.findOne({ email })
	if (!teacher) {
		return res.json({ message: "Invalid login credentials" })
	}

	const isMatched = await isPassMatched(password, teacher?.password)
	if (!isMatched) {
		return res.json({ message: "Invalid login credentials" })
	} else {
		res.status(200).json({
			status: "success",
			message: "Teacher logged in successfully",
			data: generateToken(teacher?._id),
		})
	}
})

exports.getAllTeachersAdmin = asyncHandler(async (req, res) => {
	const page = Number(reg.query.page) || 1
	const limit = Number(req - query.limit) || 2
	const skip = (page - 1) * limit
	const total = await Teacher.countDocuments()
	const startIndex = (page - 1) * limit
	const endIndex = page * limit

	const pagination = {}

	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit,
		}
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit,
		}
	}

	const teachers = await Teacher.find().skip(skip).limit(limit)
	res.status(200).json({
		total,
		results: teachers.length,
		status: "success",
		message: "Teachers fetched successfully",
		data: teachers,
	})

	res.status(200).json(results)
})

exports.getTeacherByAdmin = asyncHandler(async (req, res) => {
	const teacherID = req.params.teacherID

	const teacher = await Teacher.findById(teacherID)
	if (!teacher) {
		throw new Error("Teacher not found")
	}
	res.status(200).json({
		status: "success",
		message: "Teacher fetched successfully",
		data: teacher,
	})
})

exports.getTeacherProfile = asyncHandler(async (req, res) => {
	const teacher = await Teacher.findById(req.auth?._id).select(
		"-password -createdAt -updatedAt"
	)
	if (!teacher) {
		throw new Error("Teacher not found")
	}
	res.status(200).json({
		status: "success",
		data: teacher,
		message: "Teacher Profile fetched  successfully",
	})
})

exports.teacherUpdateProfile = asyncHandler(async (req, res) => {
	const { email, name, password } = req.body

	const emailExist = await Teacher.findOne({ email })
	if (emailExist) {
		throw new Error("This email is taken/exist")
	}

	if (password) {
		const teacher = await Teacher.findByIdAndUpdate(
			req.auth._id,
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
			data: teacher,
			message: "Teacher updated successfully",
		})
	} else {
		const teacher = await Teacher.findByIdAndUpdate(
			req.auth._id,
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
			data: teacher,
			message: "Teacher updated successfully",
		})
	}
})

exports.adminUpdateTeacher = asyncHandler(async (req, res) => {
	const { program, classLevel, academicYear, subject } = req.body

	const teacher = await Teacher.findById(req.params.teacherID)
	if (!teacher) {
		throw new Error("Teacher not found")
	}

	if (teacher.isWitdrawn) {
		throw new Error("Action denied, teacher is withdraw")
	}

	if (program) {
		teacher.program = program
		await teacher.save()
		res.status(200).json({
			status: "success",
			data: teacher,
			message: "Teacher updated successfully",
		})
	}

	if (classLevel) {
		teacher.classLevel = classLevel
		await teacher.save()
		res.status(200).json({
			status: "success",
			data: teacher,
			message: "Teacher updated successfully",
		})
	}

	if (academicYear) {
		teacher.academicYear = academicYear
		await teacher.save()
		res.status(200).json({
			status: "success",
			data: teacher,
			message: "Teacher updated successfully",
		})
	}

	if (subject) {
		teacher.subject = subject
		await teacher.save()
		res.status(200).json({
			status: "success",
			data: teacher,
			message: "Teacher updated successfully",
		})
	}
})
