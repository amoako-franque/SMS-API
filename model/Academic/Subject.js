const mongoose = require("mongoose")
const Program = require("./Program")

const { Schema } = mongoose

const subjectSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		teacher: {
			type: Schema.Types.ObjectId,
			ref: "Teacher",
		},
		academicTerm: {
			type: Schema.Types.ObjectId,
			ref: "AcademicTerm",
			required: true,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "Admin",
			required: true,
		},
		program: {
			type: Schema.Types.ObjectId,
			ref: "Program",
			required: true,
		},
		duration: {
			type: String,
			required: true,
			default: "3 months",
		},
	},
	{ timestamps: true }
)

// push subject to program linked to it automatically when subject is added
subjectSchema.post("save", async function (doc) {
	const program = await Program.findById(doc.program)
	program.subjects.push(doc._id)
	await program.save()
})

const Subject = mongoose.model("Subject", subjectSchema)

module.exports = Subject
