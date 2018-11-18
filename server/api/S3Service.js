const AWS = require('aws-sdk');
var multer = require('multer')
var multerS3 = require('multer-s3')

const config = {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    bucketName: process.env.S3_BUCKET_NAME
}
AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
});
var s3 = new AWS.S3();

module.exports = {
    s3download(keyName, res, callback) {
        let options = {
            Bucket: config.bucketName,
            Key: keyName
        }
        s3.getObject(options, callback)
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