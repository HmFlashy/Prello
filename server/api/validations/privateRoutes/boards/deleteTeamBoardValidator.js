const {param } = require('express-validator/check');

module.exports = [
    param('boardId').isString().withMessage(`BOARDID_MUST_BE_A_STRING`),
    param('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARDID_MALFORMED`),
    param('teamId').isString().withMessage(`TEAMID_MUST_BE_A_STRING`),
    param('teamId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`TEAMID_MALFORMED`),
];
