const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

//configuring the AWS environment
AWS.config.update({
    accessKeyId: "AKIAJT5MO2WU73L4JU5A",
    secretAccessKey: "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"
});

var s3 = new AWS.S3();
const s3download = (bucketName, keyName, localDest) => {

    if (typeof localDest == 'undefined') {
        localDest = keyName;
    }

    let params = {
        Bucket: bucketName,
        Key: keyName
    };

    let file = fs.createWriteStream(localDest);

    return new Promise((resolve, reject) => {
        s3.getObject(params).createReadStream()
            .on('end', () => {
                return resolve();
            })
            .on('error', (error) => {
                return reject(error);
            }).pipe(file);
    });
};
s3download("prello-khal", "folder/1540747728038_swagger.js", "./swag.js")
/*
var s3 = new AWS.S3();
var filePath = "./swagger.js";

//configuring parameters
var params = {
    Bucket: 'prello-khal',
    Body: fs.createReadStream(filePath),
    Key: "folder/" + Date.now() + "_" + path.basename(filePath)
};
s3.upload(params, function (err, data) {
    //handle error
    if (err) {
        console.log("Error", err);
    }

    //success
    if (data) {
        console.log("Uploaded in:", data.Location);
    }
});*/