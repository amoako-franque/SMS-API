const asyncHandler = require("express-async-handler")
const YearGroup = require("../../model/Academic/YearGroup")
const Admin = require("../../model/Staff/Admin")

exports.createYearGroup = asyncHandler(async (req, res) => {
	const { name, academicYear } = req.body

	const existing_year_group = await YearGroup.findOne({ name })
	if (existing_year_group) {
		throw new Error("Year Group/Graduation   already exists")
	}

	const yearGroup = await YearGroup.create({
		name,
		academicYear,
		createdBy: req.userAuth._id,
	})

	const admin = await Admin.findById(req.userAuth._id)
	if (!admin) {
		throw new Error("Admin not found")
	}

	admin.yearGroups.push(yearGroup._id)

	await admin.save()
	res.status(201).json({
		status: "success",
		message: "Year Group created successfully",
		data: yearGroup,
	})
})

exports.fetchYearGroups = asyncHandler(async (req, res) => {
	const groups = await YearGroup.find()
	res.status(200).json({
		status: "success",
		message: "Year Groups fetched successfully",
		data: groups,
	})
})

exports.fetchYearGroupById = asyncHandler(async (req, res) => {
	const group = await YearGroup.findById(req.params.id)
	res.status(200).json({
		status: "success",
		message: "Year Group fetched successfully",
		data: group,
	})
})

exports.updateYearGroupById = asyncHandler(async (req, res) => {
	const { name, academicYear } = req.body

	const yearGroupFound = await YearGroup.findOne({ name })
	if (yearGroupFound) {
		throw new Error("year Group already exists")
	}
	const yearGroup = await YearGroup.findByIdAndUpdate(
		req.params.id,
		{
			name,
			academicYear,
			createdBy: req.userAuth._id,
		},
		{
			new: true,
		}
	)

	res.status(200).json({
		status: "success",
		message: "Year Group  updated successfully",
		data: yearGroup,
	})
})

exports.deleteYearGroupById = asyncHandler(async (req, res) => {
	await YearGroup.findByIdAndDelete(req.params.id)
	res.status(200).json({
		status: "success",
		message: "Year Group deleted successfully",
	})
})
