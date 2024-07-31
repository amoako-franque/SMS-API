require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const hpp = require("hpp")
const mongoSanitize = require("express-mongo-sanitize")
const rateLimit = require("express-rate-limit")

const db = require("./config/dbConnect")
const examResultRouter = require("./routes/academics/examResultsRoute")
const questionsRouter = require("./routes/academics/questionRoutes")
const examRouter = require("./routes/academics/examRoutes")
const studentRouter = require("./routes/staff/student")
const teachersRouter = require("./routes/staff/teachers")
const yearGroupRouter = require("./routes/academics/yearGroups")
const subjectRouter = require("./routes/academics/subjects")
const programRouter = require("./routes/academics/program")
const classLevelRouter = require("./routes/academics/classLevel")
const academicTermRouter = require("./routes/academics/academicTerm")
const academicYearRouter = require("./routes/academics/academicYear")
const adminRouter = require("./routes/staff/adminRouter")
const {
	notFoundErr,
	globalErrHandler,
} = require("./middlewares/globalErrHandler")
const PORT = process.env.PORT || 47892

// connect to db
db()

const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Global middlewares
app.use(hpp())
app.use(morgan("dev"))
app.use(helmet())
app.use(mongoSanitize())

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100, // 100 requests per IP
})
app.use(limiter)

//Routes
app.use("/api/v1/admins", adminRouter)
app.use("/api/v1/academic-years", academicYearRouter)
app.use("/api/v1/academic-terms", academicTermRouter)
app.use("/api/v1/class-levels", classLevelRouter)
app.use("/api/v1/programs", programRouter)
app.use("/api/v1/subjects", subjectRouter)
app.use("/api/v1/year-groups", yearGroupRouter)
app.use("/api/v1/teachers", teachersRouter)
app.use("/api/v1/exams", examRouter)
app.use("/api/v1/students", studentRouter)
app.use("/api/v1/questions", questionsRouter)
app.use("/api/v1/exam-results", examResultRouter)

//Error middlewares handlers
app.use(notFoundErr)
app.use(globalErrHandler)

app.listen(
	PORT,
	console.log(`Server is running on port http://localhost:${PORT}`)
)
