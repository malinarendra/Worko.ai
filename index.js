const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { router } = require("./router/router")
const { connectToDatabase } = require("./config/dbConfig")

const app = express()
const PORT = process.env.PORT

// database connection
connectToDatabase()

// middlewares
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/worko/user", router)
app.use(cors())



app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

module.exports = app