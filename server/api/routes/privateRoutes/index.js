const express = require('express');
const VerifyAuthentification = require('../../middlewares/VerifyAuthentification')

const router = express.Router();

router.use('/cards', VerifyAuthentification, require('./cards/index'));
router.use('/lists', VerifyAuthentification, require('./lists/index'));
router.use('/boards', VerifyAuthentification, require('./boards/index'))
router.use('/files', VerifyAuthentification, require('./files.js'))

module.exports = router;
