const { checkSchema, body, param } = require('express-validator/check');

const Schema = {
    "role": {
        in: 'body',
        matches: {
            options: [/\b(?:Member|Admin)\b/],
            errorMessage: "INVALID_ROLE_MEMBER_OR_ADMIN"
        }
    }
};

module.exports = [
    param('boardId').isString().withMessage(`BOARDID_MUST_BE_A_STRING`),
    param('boardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`BOARDID_MALFORMED`),
    param('memberId').isString().withMessage(`MEMBERID_MUST_BE_A_STRING`),
    param('memberId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`MEMBERID_MALFORMED`),
    body('role').trim().isString().withMessage(`ROLE_MUST_BE_A_STRING`),
    checkSchema(Schema)
];
