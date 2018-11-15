const { body, param } = require('express-validator/check');

module.exports = [
    param("boardId").not().isEmpty().withMessage(`MISSING_BOARDID_PARAMETER`),
    param('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARDID_MALFORMED`),
    param("pollId").not().isEmpty().withMessage(`MISSING_POLLID_PARAMETER`),
    param('pollId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`POLLID_MALFORMED`),
    param("optionId").not().isEmpty().withMessage(`MISSING_OPTIONID_PARAMETER`),
    param('optionId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`OPTIONID_MALFORMED`)
];
