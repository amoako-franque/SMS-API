const mongoose = require("mongoose")
const Student = require("./Student")

const yearSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},

		academicYear: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "AcademicYear",
			required: true,
		},
		students: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Student",
			},
		],
	},
	{
		timestamps: true,
	}
)

const YearGroup = mongoose.model("YearGroup", yearSchema)

module.exports = YearGroup
