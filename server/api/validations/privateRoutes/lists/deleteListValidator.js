const { body, param } = require('express-validator/check');

module.exports = [
    param("listId").not().isEmpty().withMessage(`MISSING_BOARD_ID_PARAMETER`),
    param('listId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARD_ID_MALFORMED`),
];
