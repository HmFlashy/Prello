const { body, param } = require('express-validator/check');

module.exports = [
    param('boardId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    param('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
    body('userId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    body('userId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
];
