const mongoose = require("mongoose")
const URI = process.env.URI


const connectToDatabase = async () => {
    console.log(URI)
    await mongoose.connect(URI)
    console.log("Connected to database")
}

module.exports={connectToDatabase}