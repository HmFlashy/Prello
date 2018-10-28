const express = require('express');

const router = express.Router();

router.post('/login', require('./login'));

module.exports = router;
