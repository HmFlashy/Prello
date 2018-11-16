const { body, param } = require('express-validator/check');

module.exports = [
    body("name").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('name').isString().withMessage(`NAME_MUST_BE_A_STRING`),
    body("visibility").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('visibility').isString().withMessage(`NAME_MUST_BE_A_STRING`),
    body('teamId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    body('teamId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
    body('categoryId').isString().withMessage(`COMMENTID_MUST_BE_A_STRING`),
    body('categoryId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`COMMENTID_MALFORMED`),
];
