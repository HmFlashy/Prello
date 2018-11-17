const { body, param } = require('express-validator/check');

module.exports = [
    param('boardId').isString().withMessage(`BOARDID_MUST_BE_A_STRING`),
    param('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARDID_MALFORMED`),
    body('userId').isString().withMessage(`USERID_MUST_BE_A_STRING`),
    body('userId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`USERID_MALFORMED`),
];
