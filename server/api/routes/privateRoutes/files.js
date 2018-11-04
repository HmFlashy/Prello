const express = require('express');
const S3 = require("../../S3Service.js")
const router = express.Router();

router.get("/", (req, res) => {
    !req.query.key
        ? res.status(400).send("No key specified")
        : S3.s3download(req.query.key, res, (err, data) => {
            if (err)
                res.status(err.statusCode).send(err.message)
            else {
                res.attachment(req.query.key);
                res.status(200).send(data.Body);
            }
        })
})

router.post("/", (req, res) => {
    S3.s3Upload.single('file')(req, res, err => {
        err ? res.status(400).send("Malformed request") : res.status(200).send('Successfully uploaded file!')
    })
})

module.exports = router
