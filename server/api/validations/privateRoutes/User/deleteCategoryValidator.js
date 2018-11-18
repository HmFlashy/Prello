const { param } = require('express-validator/check');

module.exports = [
    param('categoryId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    param('categoryId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
];
