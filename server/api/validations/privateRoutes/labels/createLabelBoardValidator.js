const { body, param } = require('express-validator/check');

module.exports = [
    body("name").trim().not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('name').isString().trim().withMessage(`NAME_MUST_BE_A_STRING`),
    body("color").trim().not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('color').isString().trim().withMessage(`NAME_MUST_BE_A_STRING`),
    param('boardId').not().isEmpty().withMessage(`MISSING_BOARD_ID_PARAMETER`),
    param('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARD_ID_MALFORMED`),
];
