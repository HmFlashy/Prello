const { body} = require('express-validator/check');

module.exports = [
    body("name").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('name').isString().withMessage(`NAME_MUST_BE_A_STRING`),
];
