const { body, param } = require('express-validator/check');

module.exports = [
    body("name").not().isEmpty().withMessage(`MISSING_OPTION_PARAMETER`),
    body('name').isString().withMessage(`OPTION_MUST_BE_A_STRING`),
    param("boardId").not().isEmpty().withMessage(`MISSING_BOARDID_PARAMETER`),
    param('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARDID_MALFORMED`)
];
