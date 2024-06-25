const { User } = require("../models/userModel")

const findAll = async () => {
    return await User.find({ isDeleted: false })
}

const findById = async (userId) => {
    return await User.findOne({ _id: userId, isDeleted: false })
}

const create = async (userData) => {
    let user = new User(userData)
    return await user.save()
}

const update = async (userData) => {
    return await User.findByIdAndUpdate(userData._id, userData, { new: true })
}

const patch = async (userData) => {
    return await User.findByIdAndUpdate(userData._id, { $set: userData }, { new: true })
}

const deleteUser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { isDeleted: true })
}

const deleteAll = async (userId) => {
    return await User.deleteMany({})
}

module.exports = { findAll, findById, create, update, patch, deleteUser, deleteAll }