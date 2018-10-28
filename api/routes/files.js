const express = require('express');
const S3 = require("../S3Service.js")
const router = express.Router();

router.get("/", (req, res) => {
    S3.s3download(req.query.key, res)
})

router.post("/", (req, res) => {
    S3.s3Upload.single('file')(req, res, err => {
        if (err) {
            res.send("Malformed request")
        }
        res.send('Successfully uploaded file!')
    })
})

module.exports = router
