const userServices = require("../services/userServices")
const userDto = require("../DTO/userDto")
const { generateToken } = require("../middlewares/jwt")
const { Types } = require("mongoose").Types

const listUsers = async (req, res) => {
    let users = await userServices.getAllUsers()
    let result = await users.map((user) => userDto(user))
    res
        .status(200)
        .json(
            {
                success: true,
                message: "Users fetched successfully",
                totolUsers: result.length,
                data: result
            }
        )
}

const getUser = async (req, res) => {
    let user = await userServices.getUserById(req.params.userId)

    if (user === null) {
        res
            .status(200)
            .json(
                {
                    success: false,
                    message: "User not found"
                }
            )
    } else {
        res
            .status(200)
            .json(
                {
                    success: true,
                    message: "User found",
                    data: userDto(user)
                }
            )
    }
}

const createUser = async (req, res) => {
    let newUser = await userServices.createUser(req.body)
    let obj = {
        _id: newUser._id,
        email: newUser.email,
    }
    let token = await generateToken(obj)
    res
        .status(201)
        .cookie("Authorization", `Bearer ${token}`)
        .json(
            {
                success: true,
                message: "User created",
                user: userDto(newUser),
                token
            }
        );
}

const updateUser = async (req, res) => {
    let updatedUser = await userServices.updateUser(req.body)
    if (updatedUser === null) {
        res
            .status(200)
            .json(
                {
                    success: false,
                    message: "User not found, unable to update user"
                }
            )
    } else {
        res
            .status(200)
            .json(
                {
                    success: true,
                    message: "User updated successful",
                    data: userDto(updatedUser)
                }
            )
    }
}

const patchUser = async (req, res) => {
    let patchedUser = await userServices.patchUser(req.body)
    if (patchedUser === null) {
        res
            .status(200)
            .json(
                {
                    success: false,
                    message: "User not found, unable to patch user"
                }
            )
    } else {
        res
            .status(200)
            .json(
                {
                    success: true,
                    message: "User patched successful",
                    data: userDto(patchedUser)
                }
            )
    }
}

const deleteUser = async (req, res) => {
    let deleteResult = await userServices.deleteUser(req.params.userId)
    if (deleteResult === null) {
        res
            .status(200)
            .json(
                {
                    success: false,
                    message: "User not found"
                }
            )
    } else {
        res
            .status(200)
            .json(
                {
                    success: true,
                    message: "User deleted successfully"
                }
            )
    }
}

module.exports = { listUsers, getUser, createUser, updateUser, patchUser, deleteUser }