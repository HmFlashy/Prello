const { param } = require('express-validator/check');

module.exports = [
    param("boardId").not().isEmpty().withMessage(`MISSING_BOARDID_PARAMETER`),
    param('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARDID_MALFORMED`),
    param("pollId").not().isEmpty().withMessage(`MISSING_POLLID_PARAMETER`),
    param('pollId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`POLLID_MALFORMED`),
];
