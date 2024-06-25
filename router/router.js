const router = require("express").Router()
const userController = require("../controller/userController")
const { validatorAllFields } = require("../middlewares/validatorAllFields")
const { checkToken } = require("../middlewares/jwt")


router.get("/", checkToken, userController.listUsers)
router.get("/:userId", checkToken, userController.getUser)
router.post("/", [validatorAllFields], userController.createUser)
router.put("/", [checkToken, validatorAllFields], userController.updateUser)
router.patch("/", [checkToken, validatorAllFields], userController.patchUser)
router.delete("/:userId", checkToken, userController.deleteUser)

module.exports = { router }