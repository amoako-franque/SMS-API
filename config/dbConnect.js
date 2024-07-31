const mongoose = require("mongoose")
const mongodb_database = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL)
		console.log("DB Connected Successfully")
	} catch (error) {
		console.log("DB Connection failed", error.message)
	}
}

module.exports = mongodb_database
