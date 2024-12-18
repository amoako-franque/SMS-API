const asyncHandler = require("express-async-handler")
const ClassLevel = require("../../model/Academic/ClassLevel")
const Admin = require("../../model/Staff/Admin")

exports.createClassLevel = asyncHandler(async (req, res) => {
	const { name, description, duration } = req.body

	const classFound = await ClassLevel.findOne({ name })
	if (classFound) {
		throw new Error("Class  already exists")
	}

	const classCreated = await ClassLevel.create({
		name,
		description,
		createdBy: req.auth._id,
	})

	const admin = await Admin.findById(req.auth._id)
	admin.classLevels.push(classCreated._id)

	await admin.save()

	res.status(201).json({
		status: "success",
		message: "Class created successfully",
		data: classCreated,
	})
})

exports.fetchClassLevels = asyncHandler(async (req, res) => {
	const classes = await ClassLevel.find()
	res.status(200).json({
		status: "success",
		message: "Class Levels fetched successfully",
		data: classes,
	})
})

exports.fetchClassLevelById = asyncHandler(async (req, res) => {
	const classLevel = await ClassLevel.findById(req.params.id)
	res.status(200).json({
		status: "success",
		message: "Class fetched successfully",
		data: classLevel,
	})
})

exports.updateClassLevelById = asyncHandler(async (req, res) => {
	const { name, description } = req.body

	const classFound = await ClassLevel.findOne({ name })
	if (classFound) {
		throw new Error("Class already exists")
	}
	const classLevel = await ClassLevel.findByIdAndUpdate(
		req.params.id,
		{
			name,
			description,
			createdBy: req.auth._id,
		},
		{
			new: true,
		}
	)

	res.status(200).json({
		status: "success",
		message: "Class  updated successfully",
		data: classLevel,
	})
})

exports.deleteClassLevelById = asyncHandler(async (req, res) => {
	await ClassLevel.findByIdAndDelete(req.params.id)
	res.status(200).json({
		status: "success",
		message: "Class level deleted successfully",
	})
})
