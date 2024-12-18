const asyncHandler = require("express-async-handler")
const Program = require("../../model/Academic/Program")
const Subject = require("../../model/Academic/Subject")
const Admin = require("../../model/Staff/Admin")

exports.createSubject = asyncHandler(async (req, res) => {
	const { name, description, academicTerm } = req.body

	const program = await Program.findById(req.params.programId)
	if (!program) {
		throw new Error("Program  not found")
	}

	const subjectFound = await Subject.findOne({ name })
	if (subjectFound) {
		throw new Error("Subject  already exists")
	}

	const subject = await Subject.create({
		name,
		description,
		academicTerm,
		program: program._id,
		createdBy: req.auth._id,
	})

	res.status(201).json({
		status: "success",
		message: "Subject added successfully",
		data: subject,
	})
})

exports.fetchSubjects = asyncHandler(async (req, res) => {
	const subjects = await Subject.find()
	res.status(200).json({
		status: "success",
		message: "Subjects fetched successfully",
		data: subjects,
	})
})

exports.fetchSubjectById = asyncHandler(async (req, res) => {
	const subject = await Subject.findById(req.params.id)
	res.status(200).json({
		status: "success",
		message: "Subject fetched successfully",
		data: subject,
	})
})

exports.updateSubjectById = asyncHandler(async (req, res) => {
	const { name, description, academicTerm } = req.body

	const subjectFound = await Subject.findOne({ name })
	if (subjectFound) {
		throw new Error("Program already exists")
	}
	const subject = await Subject.findByIdAndUpdate(
		req.params.id,
		{
			name,
			description,
			academicTerm,
			createdBy: req.auth._id,
		},
		{
			new: true,
		}
	)

	res.status(200).json({
		status: "success",
		message: "subject  updated successfully",
		data: subject,
	})
})

exports.deleteSubjectById = asyncHandler(async (req, res) => {
	await Subject.findByIdAndDelete(req.params.id)
	res.status(200).json({
		status: "success",
		message: "subject deleted successfully",
	})
})
