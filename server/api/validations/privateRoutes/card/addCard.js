const {body} = require('express-validator/check');

module.exports = [
    body("name").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body('name').isString().withMessage(`NAME_MUST_BE_A_STRING`),
    body('listId').exists().withMessage(`MISSING_LIST_ID_PARAMETER`),
    body('listId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`LIST_ID_MALFORMED`),
];
