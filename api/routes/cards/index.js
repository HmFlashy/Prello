const express = require("express")
const router = express.Router()

router.get("/:idCard", require("./getCardById"))

module.exports = router