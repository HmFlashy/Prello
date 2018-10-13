const express = require('express');
const path = require('path');
const router = express.Router();
const mongoose = require("mongoose")

router.get("/hello", (req, res) => {
    res.status(200).json("Hello world !");
})


router.all("*", (req, res) => {
    res.sendStatus(404);
    res.end();
})

module.exports = router;