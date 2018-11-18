const { body} = require('express-validator/check');

module.exports = [
    body("name").trim().not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('name').isString().trim().withMessage(`NAME_MUST_BE_A_STRING`),
];
