const express = require('express');

const router = express.Router();

router.post('/', require('./addList'));

module.exports = router;
