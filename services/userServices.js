const userDao = require("../DAO/userDao")

const getAllUsers = async () => {
    return await userDao.findAll()
}

const getUserById = async (userId) => {
    return await userDao.findById(userId)
}

const createUser = async (userData) => {
    return userDao.create(userData)
}

const updateUser = async (userData) => {
    return await userDao.update(userData)
}

const patchUser = async (userData) => {
    return await userDao.patch(userData)
}

const deleteUser = async (userId) => {
    return await userDao.deleteUser(userId)
}

const deleteAll = async ()=>{
    return await userDao.deleteAll()
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, patchUser, deleteUser, deleteAll }