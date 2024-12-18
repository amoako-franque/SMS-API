const asyncHandler = require("express-async-handler")
const AcademicTerm = require("../../model/Academic/AcademicTerm")
const Admin = require("../../model/Staff/Admin")

exports.createAcademicTerm = asyncHandler(async (req, res) => {
	const userId = req?.auth?._id
	const { name, description, duration } = req.body
	const academicTerm = await AcademicTerm.findOne({ name })
	if (academicTerm) {
		throw new Error("Academic term already exists")
	}
	const academicTermCreated = await AcademicTerm.create({
		name,
		description,
		duration,
		createdBy: userId,
	})

	const admin = await Admin.findById(req.auth._id)
	admin.academicTerms.push(academicTermCreated._id)
	await admin.save()
	res.status(201).json({
		status: "success",
		message: "Academic term created successfully",
		data: academicTermCreated,
	})
})

exports.fetchAcademicTerms = asyncHandler(async (req, res) => {
	const academicTerms = await AcademicTerm.find()

	res.status(200).json({
		status: "success",
		message: "Academic terms fetched successfully",
		data: academicTerms,
	})
})

exports.fetchAcademicTermById = asyncHandler(async (req, res) => {
	const termId = req.params.id

	const academicTerms = await AcademicTerm.findById(termId)

	res.status(200).json({
		status: "success",
		message: "Academic terms fetched successfully",
		data: academicTerms,
	})
})

exports.updateAcademicTermsById = asyncHandler(async (req, res) => {
	const { name, description, duration } = req.body

	const termId = req.params.id

	const createAcademicTermFound = await AcademicTerm.findOne({ name })
	if (createAcademicTermFound) {
		throw new Error("Academic terms= already exists")
	}
	const academicTerms = await AcademicTerm.findByIdAndUpdate(
		termId,
		{
			name,
			description,
			duration,
			createdBy: req.auth._id,
		},
		{
			new: true,
		}
	)

	res.status(200).json({
		status: "success",
		message: "Academic term updated successfully",
		data: academicTerms,
	})
})

exports.deleteAcademicTermById = asyncHandler(async (req, res) => {
	const termId = req.params.id
	await AcademicTerm.findByIdAndDelete(termId)

	res.status(200).json({
		status: "success",
		message: "Academic term deleted successfully",
	})
})
