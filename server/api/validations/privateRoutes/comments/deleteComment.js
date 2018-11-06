const { body, param } = require('express-validator/check');

module.exports = [
    param("cardId").not().isEmpty().withMessage(`MISSING_CARDID_PARAMETER`),
    param('cardId').isString().withMessage(`CARDID_MUST_BE_A_STRING`),
    param('cardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`CARDID_MALFORMED`),
    param("commentId").not().isEmpty().withMessage(`MISSING_COMMENTID_PARAMETER`),
    param('commentId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    param('commentId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
];
