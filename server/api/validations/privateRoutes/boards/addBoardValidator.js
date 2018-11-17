const { body, param } = require('express-validator/check');

module.exports = [
    body("name").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('name').isString().withMessage(`NAME_MUST_BE_A_STRING`),
    body("visibility").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('visibility').isString().withMessage(`NAME_MUST_BE_A_STRING`),
    body('teamId').optional({nullable: true, checkFalsy: true}).isString().withMessage(`TEAMID_MUST_BE_A_STRING`),
    body('teamId').optional({nullable: true, checkFalsy: true}).matches(/^[0-9a-fA-F]{24}$/).withMessage(`TEAMID_MALFORMED`),
    body('categoryId').optional({checkFalsy: true}).isString().withMessage(`CATEGORYID_MUST_BE_A_STRING`),
    body('categoryId').optional({checkFalsy: true}).matches(/^[0-9a-fA-F]{24}$/).withMessage(`CATEGORYID_MALFORMED`),
];
