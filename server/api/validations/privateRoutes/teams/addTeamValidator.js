const { body } = require('express-validator/check');

module.exports = [
    body('creator').isString().withMessage(`CARDID_MUST_BE_A_STRING`),
    body('creator').matches(/^[0-9a-fA-F]{24}$/).withMessage(`CARDID_MALFORMED`),
    body("name").trim().not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('name').isString().trim().withMessage(`NAME_MUST_BE_A_STRING`),
];
