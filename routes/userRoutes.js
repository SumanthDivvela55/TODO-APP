const express = require("express")
const router = express.Router()
const { userRegister, userLogin, userDetails } = require("../controllers/userController")
const  validateToken  = require("../middleware/validateTokenHandler")

router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/current", validateToken, userDetails)

module.exports = router