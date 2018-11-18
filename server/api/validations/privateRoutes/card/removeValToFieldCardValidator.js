const { param } = require('express-validator/check');

module.exports = [
    param('cardId').isString().withMessage(`CARDID_MUST_BE_A_STRING`),
    param('cardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`CARDID_MALFORMED`),
    param("field").not().isEmpty().withMessage(`MISSING_CONTENT_PARAMETER`),
    param('field').isString().withMessage(`CONTENT_MUST_BE_A_STRING`),
    param("value").not().isEmpty().withMessage(`MISSING_CONTENT_PARAMETER`),
    param('value').isString().withMessage(`CONTENT_MUST_BE_A_STRING`),
];
