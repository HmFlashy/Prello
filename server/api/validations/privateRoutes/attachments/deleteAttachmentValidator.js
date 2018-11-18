const { param } = require('express-validator/check');

module.exports = [
    param('cardId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`CARDID_MALFORMED`),
    param('attachmentId').matches(/^[0-9a-fA-F]{24}$/).withMessage(`ATTACHMENTID_MALFORMED`),
];
