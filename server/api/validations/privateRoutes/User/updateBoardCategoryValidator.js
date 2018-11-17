const { body, param } = require('express-validator/check');

module.exports = [
    param('boardId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    param('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
    body('categoryId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    body('categoryId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
];
