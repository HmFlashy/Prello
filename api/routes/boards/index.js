const express = require('express');

const router = express.Router();

router.get("/:boardId", require('./getBoardById'))

module.exports = router;
