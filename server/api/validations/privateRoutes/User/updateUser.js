const { body, param } = require('express-validator/check');

module.exports = [
    body("bio").not().isEmpty().withMessage(`MISSING_BIO_PARAMETER`),
    body('bio').isString().withMessage(`BIO_MUST_BE_A_STRING`),
    body("email").not().isEmpty().withMessage(`MISSING_EMAIL_PARAMETER`),
    body('email').isString().withMessage(`EMAIL_MUST_BE_A_STRING`),
    body("fullName").not().isEmpty().withMessage(`MISSING_FULLNAME_PARAMETER`),
    body('fullName').isString().withMessage(`FULLNAME_MUST_BE_A_STRING`),
    body("organization").not().isEmpty().withMessage(`MISSING_ORGANIZATION_PARAMETER`),
    body('organization').isString().withMessage(`ORGANIZATION_MUST_BE_A_STRING`),
    body("username").not().isEmpty().withMessage(`MISSING_USERNAME_PARAMETER`),
    body('username').isString().withMessage(`USERNAME_MUST_BE_A_STRING`),
];
