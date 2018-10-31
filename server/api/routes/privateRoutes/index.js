const express = require('express');

const router = express.Router();

router.use('/cards', require('./cards/index'));
router.use('/lists', require('./lists/index'));
router.use('/boards', require('./boards/index'))
router.use('/files', require('./files.js'))

module.exports = router;
