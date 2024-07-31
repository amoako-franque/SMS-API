const mongoose = require("mongoose")

const { Schema } = mongoose

const ClassLevelSchema = new Schema(
	{
		//level 100
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "Admin",
			required: true,
		},
		students: [
			{
				type: Schema.Types.ObjectId,
				ref: "Student",
			},
		],
		//optional.
		subjects: [
			{
				type: Schema.Types.ObjectId,
				ref: "Subject",
			},
		],
		teachers: [
			{
				type: Schema.Types.ObjectId,
				ref: "Teacher",
			},
		],
	},
	{ timestamps: true }
)

const ClassLevel = mongoose.model("ClassLevel", ClassLevelSchema)

module.exports = ClassLevel
