const mongoose = require("mongoose")

const userObject = {
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default:false
    }
}

const userSchema = new mongoose.Schema(userObject)

const User = mongoose.model('User', userSchema)

module.exports={User}