const express = require('express');

const router = express.Router();

router.use('/cards', require('./cards'));
router.use('/lists', require('./lists'));
router.use('/boards', require('./boards'))

module.exports = router;
