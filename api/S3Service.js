const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
var multer = require('multer')
var multerS3 = require('multer-s3')

const config = {
    accessKeyId: "AKIAJT5MO2WU73L4JU5A",
    secretAccessKey: "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",
    bucketName: "prello-khal"
}
AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
});
var s3 = new AWS.S3();


module.exports = {
    s3download(keyName, res) {
        let options = {
            Bucket: config.bucketName,
            Key: keyName
        }
        s3.getObject(options, function (err, data) {
            if (err === null) {
                res.attachment(keyName);
                res.send(data.Body);
            } else {
                res.status(err.statusCode).send(err.message);
            }
        })
    },
    s3Upload:
        multer({
            storage: multerS3({
                s3: s3,
                bucket: config.bucketName,
                key: function (req, file, cb) {
                    cb(null, file.originalname);
                },
            })
        })
}