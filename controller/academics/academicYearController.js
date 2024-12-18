const asyncHandler = require("express-async-handler")
const AcademicYear = require("../../model/Academic/AcademicYear")
const Admin = require("../../model/Staff/Admin")

exports.createAcademicYear = asyncHandler(async (req, res) => {
	const { name, fromYear, toYear } = req.body

	const academicYear = await AcademicYear.findOne({ name })
	if (academicYear) {
		throw new Error("Academic year already exists")
	}

	const academicYearCreated = await AcademicYear.create({
		name,
		fromYear,
		toYear,
		createdBy: req.auth._id,
	})
	if (academicYearCreated) {
		const admin = await Admin.findById(req.auth._id)
		admin.academicYears.push(academicYearCreated._id)
		await admin.save()
		res.status(201).json({
			status: "success",
			message: "Academic year created successfully",
			data: academicYearCreated,
		})
	} else {
		throw new Error("Academic year not created")
	}
})

exports.fetchAcademicYears = asyncHandler(async (req, res) => {
	const academicYears = await AcademicYear.find()

	res.status(200).json({
		status: "success",
		message: "Academic years fetched successfully",
		data: academicYears,
	})
})

exports.fetchAcademicYearById = asyncHandler(async (req, res) => {
	const academicYears = await AcademicYear.findById(req.params.id)

	res.status(200).json({
		status: "success",
		message: "Academic years fetched successfully",
		data: academicYears,
	})
})

exports.updateAcademicYearById = asyncHandler(async (req, res) => {
	const { name, fromYear, toYear } = req.body

	const createAcademicYearFound = await AcademicYear.findOne({ name })
	if (createAcademicYearFound) {
		throw new Error("Academic year already exists")
	}
	const academicYear = await AcademicYear.findByIdAndUpdate(
		req.params.id,
		{
			name,
			fromYear,
			toYear,
			createdBy: req.auth._id,
		},
		{
			new: true,
		}
	)

	res.status(200).json({
		status: "success",
		message: "Academic years updated successfully",
		data: academicYear,
	})
})

exports.deleteAcademicYearById = asyncHandler(async (req, res) => {
	const academic_year = await AcademicYear.findByIdAndDelete(req.params.id)

	res.status(200).json({
		status: "success",
		message: "Academic year deleted successfully",
	})
})
