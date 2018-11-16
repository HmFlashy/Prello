const { body, param } = require('express-validator/check');

module.exports = [
    body("name").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('name').isString().withMessage(`NAME_MUST_BE_A_STRING`),
    body("color").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('color').isString().withMessage(`NAME_MUST_BE_A_STRING`),
    param('boardId').not().isEmpty().withMessage(`MISSING_BOARD_ID_PARAMETER`),
    param('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARD_ID_MALFORMED`),
];
