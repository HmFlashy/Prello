const { body, param } = require('express-validator/check');

module.exports = [
    body('creator').isString().withMessage(`CARDID_MUST_BE_A_STRING`),
    body('creator').matches(/^[0-9a-fA-F]{24}$/).withMessage(`CARDID_MALFORMED`),
    body("name").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('name').isString().withMessage(`NAME_MUST_BE_A_STRING`),
];
