const { body } = require('express-validator/check');

module.exports = [
    body("bio").trim().not().isEmpty().withMessage(`MISSING_BIO_PARAMETER`),
    body('bio').isString().trim().withMessage(`BIO_MUST_BE_A_STRING`),
    body("email").trim().not().isEmpty().withMessage(`MISSING_EMAIL_PARAMETER`),
    body('email').isString().trim().withMessage(`EMAIL_MUST_BE_A_STRING`),
    body("fullName").trim().not().isEmpty().withMessage(`MISSING_FULLNAME_PARAMETER`),
    body('fullName').isString().trim().withMessage(`FULLNAME_MUST_BE_A_STRING`),
    body("organization").trim().not().isEmpty().withMessage(`MISSING_ORGANIZATION_PARAMETER`),
    body('organization').isString().trim().withMessage(`ORGANIZATION_MUST_BE_A_STRING`),
    body("username").trim().not().isEmpty().withMessage(`MISSING_USERNAME_PARAMETER`),
    body('username').isString().trim().withMessage(`USERNAME_MUST_BE_A_STRING`),
];
