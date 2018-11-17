const { body, param } = require('express-validator/check');

module.exports = [
    param('cardId').isString().withMessage(`CARDID_MUST_BE_A_STRING`),
    param('cardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`CARDID_MALFORMED`),
    body('oldListId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    body('oldListId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
    body('newListId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    body('newListId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
    body("pos").not().isEmpty().withMessage(`MISSING_CONTENT_PARAMETER`),
];
