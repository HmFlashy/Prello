const { param } = require('express-validator/check');

module.exports = [
    param('boardId').not().isEmpty().withMessage(`MISSING_BOARD_ID_PARAMETER`),
    param('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARD_ID_MALFORMED`),
    param('labelId').not().isEmpty().withMessage(`MISSING_BOARD_ID_PARAMETER`),
    param('labelId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARD_ID_MALFORMED`),
];
