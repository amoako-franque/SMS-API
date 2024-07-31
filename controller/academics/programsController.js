const asyncHandler = require("express-async-handler")
const ClassLevel = require("../../model/Academic/ClassLevel")
const Program = require("../../model/Academic/Program")
const Subject = require("../../model/Academic/Subject")
const Admin = require("../../model/Staff/Admin")

exports.createProgram = asyncHandler(async (req, res) => {
	const { name, description } = req.body

	const programFound = await Program.findOne({ name })
	if (programFound) {
		throw new Error("Program  already exists")
	}

	const programCreated = await Program.create({
		name,
		description,
		createdBy: req.userAuth._id,
	})

	const admin = await Admin.findById(req.userAuth._id)
	admin.programs.push(programCreated._id)

	await admin.save()

	res.status(201).json({
		status: "success",
		message: "Program created successfully",
		data: programCreated,
	})
})

exports.fetchPrograms = asyncHandler(async (req, res) => {
	const programs = await Program.find()
	res.status(200).json({
		status: "success",
		message: "Programs fetched successfully",
		data: programs,
	})
})

exports.fetchProgramById = asyncHandler(async (req, res) => {
	const program = await Program.findById(req.params.id)
	res.status(200).json({
		status: "success",
		message: "Program fetched successfully",
		data: program,
	})
})

exports.updateProgramById = asyncHandler(async (req, res) => {
	const { name, description } = req.body

	const programFound = await ClassLevel.findOne({ name })
	if (programFound) {
		throw new Error("Program already exists")
	}
	const program = await Program.findByIdAndUpdate(
		req.params.id,
		{
			name,
			description,
			createdBy: req.userAuth._id,
		},
		{
			new: true,
		}
	)

	res.status(200).json({
		status: "success",
		message: "Program  updated successfully",
		data: program,
	})
})

exports.deleteProgramById = asyncHandler(async (req, res) => {
	await Program.findByIdAndDelete(req.params.id)
	res.status(200).json({
		status: "success",
		message: "Program deleted successfully",
	})
})

exports.addSubjectToProgram = asyncHandler(async (req, res) => {
	const { name } = req.body

	const program = await Program.findById(req.params.id)
	if (!program) {
		throw new Error("Program not found")
	}

	const subjectFound = await Subject.findOne({ name })
	if (!subjectFound) {
		throw new Error("Subject not found")
	}

	const subjectExists = program.subjects?.find(
		(sub) => sub?.toString() === subjectFound?._id.toString()
	)
	if (subjectExists) {
		throw new Error("Subject already exists")
	}

	program.subjects.push(subjectFound?._id)

	await program.save()
	res.status(200).json({
		status: "success",
		message: "Subject added successfully",
		data: program,
	})
})
