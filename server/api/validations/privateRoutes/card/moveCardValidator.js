const { body, param } = require('express-validator/check');

module.exports = [
    param('cardId').isString().withMessage(`CARDID_MUST_BE_A_STRING`),
    param('cardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`CARDID_MALFORMED`),
    param('oldListId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    param('oldListId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
    param('newListId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    param('newListId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
    body("pos").not().isEmpty().withMessage(`MISSING_CONTENT_PARAMETER`),
];
