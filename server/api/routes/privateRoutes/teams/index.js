const express = require('express');

const router = express.Router();

router.get('/:teamId', require('./getTeamById'));

module.exports = router;