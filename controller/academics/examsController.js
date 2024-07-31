const asyncHandler = require("express-async-handler")
const Exam = require("../../model/Academic/Exam")
const Teacher = require("../../model/Staff/Teacher")

exports.createExam = asyncHandler(async (req, res) => {
	const {
		name,
		description,
		subject,
		program,
		academicTerm,
		duration,
		examDate,
		examTime,
		examType,
		createdBy,
		academicYear,
		classLevel,
	} = req.body

	const teacherFound = await Teacher.findById(req.userAuth?._id)
	if (!teacherFound) {
		throw new Error("Teacher not found")
	}

	const examExists = await Exam.findOne({ name })
	if (examExists) {
		throw new Error("Exam already exists")
	}

	const examCreated = new Exam({
		name,
		description,
		academicTerm,
		academicYear,
		classLevel,
		createdBy,
		duration,
		examDate,
		examTime,
		examType,
		subject,
		program,
		createdBy: req.userAuth?._id,
	})

	teacherFound.examsCreated.push(examCreated._id)

	await examCreated.save()
	await teacherFound.save()
	res.status(201).json({
		status: "success",
		message: "Exam created",
		data: examCreated,
	})
})

exports.fetchExams = asyncHandler(async (req, res) => {
	const exams = await Exam.find().populate({
		path: "questions",
		populate: {
			path: "createdBy",
		},
	})
	res.status(200).json({
		status: "success",
		message: "Exams fetched successfully",
		data: exams,
	})
})

exports.fetchExamById = asyncHandler(async (req, res) => {
	const exams = await Exam.findById(req.params.id)
	res.status(200).json({
		status: "success",
		message: "Exam fetched successfully",
		data: exams,
	})
})

exports.updateExamById = asyncHandler(async (req, res) => {
	const {
		name,
		description,
		subject,
		program,
		academicTerm,
		duration,
		examDate,
		examTime,
		examType,
		createdBy,
		academicYear,
		classLevel,
	} = req.body

	const examFound = await Exam.findOne({ name })
	if (examFound) {
		throw new Error("Exam already exists")
	}

	const examUpdated = await Exam.findByIdAndUpdate(
		req.params.id,
		{
			name,
			description,
			subject,
			program,
			academicTerm,
			duration,
			examDate,
			examTime,
			examType,
			createdBy,
			academicYear,
			classLevel,
			createdBy: req.userAuth._id,
		},
		{
			new: true,
		}
	)

	res.status(200).json({
		status: "success",
		message: "Exam  updated successfully",
		data: examUpdated,
	})
})
