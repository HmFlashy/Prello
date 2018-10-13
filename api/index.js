const express = require('express')
const path = require('path')
const router = express.Router()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use(require("./routes"))

router.all("*", (req, res) => {
    res.sendStatus(404)
    res.end()
})

module.exports = router