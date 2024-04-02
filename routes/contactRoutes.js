const express = require("express")
const router = express.Router()
const { getContacts, getContact, postContacts, putContacts, deleteContacts } = require("../controllers/contactControllers")
const validateToken = require("../middleware/validateTokenHandler")

router.use(validateToken)

router.get("/", getContacts)
router.get("/:id", getContact)
router.post("/", postContacts)
router.put("/:id", putContacts)
router.delete("/:id", deleteContacts)

module.exports = router