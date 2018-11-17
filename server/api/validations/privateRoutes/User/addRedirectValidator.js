const { body, param } = require('express-validator/check');

module.exports = [
    body("clientId").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
    body("uri").not().isEmpty().withMessage(`MISSING_NAME_PARAMETER`),
];
