const { body, param } = require('express-validator/check');

module.exports = [
    body("name").not().isEmpty().withMessage(`MISSING_URL_PARAMETER`),
    body('name').isString().withMessage(`URL_MUST_BE_A_STRING`),
    body("url").not().isEmpty().withMessage(`MISSING_URL_PARAMETER`),
    body('url').isString().withMessage(`URL_MUST_BE_A_STRING`),
    param('cardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`CARDID_MALFORMED`),
];