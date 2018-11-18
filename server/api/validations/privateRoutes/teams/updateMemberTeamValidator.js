const { body, param } = require('express-validator/check');

module.exports = [
    param('teamId').isString().withMessage(`CARDID_MUST_BE_A_STRING`),
    param('teamId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`CARDID_MALFORMED`),
    param('memberId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    param('memberId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
    body("role").trim().not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('role').isString().trim().withMessage(`NAME_MUST_BE_A_STRING`),
];
