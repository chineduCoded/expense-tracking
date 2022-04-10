require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./db/expDatabase")



// db connection
connectDB()


const app = express()

// use middleware
app.use(express.json())
app.use(cors())

// use routes
app.use("/", (req, res) => {
    res.send("Welcome to my expense Tracker")
})
app.use("/api/categories", require("./routes/categoryRoutes"))
app.use("/api/transaction", require("./routes/transactionRoutes"))
app.use("/api/labels", require("./routes/labelRoutes"))


const port = process.env.PORT || 5000

app.listen(port, () => {console.log(`Server is running on port ${port}`)})