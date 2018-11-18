const { body, param } = require('express-validator/check');

module.exports = [
    body("author").trim().not().isEmpty().withMessage(`MISSING_AUTHOR_PARAMETER`),
    body('author').isString().trim().withMessage(`AUTHOR_MUST_BE_A_STRING`),
    param("cardId").trim().not().isEmpty().withMessage(`MISSING_CARDID_PARAMETER`),
    param('cardId').isString().withMessage(`CARDID_MUST_BE_A_STRING`),
    body("content").trim().not().isEmpty().withMessage(`MISSING_CONTENT_PARAMETER`),
    body('content').isString().trim().withMessage(`CONTENT_MUST_BE_A_STRING`),
    body('author').matches(/^[0-9a-fA-F]{24}$/).withMessage(`AUTHOR_MALFORMED`),
    param('cardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`CARDID_MALFORMED`),
];
