const { body } = require('express-validator/check');

module.exports = [
    body("name").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('name').isString().withMessage(`NAME_MUST_BE_A_STRING`),
    body("pos").not().isEmpty().withMessage(`MISSING_POS_PARAMETER`),
    body('boardId').not().isEmpty().withMessage(`MISSING_BOARD_ID_PARAMETER`),
    body('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARD_ID_MALFORMED`),
];
