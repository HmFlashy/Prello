const express = require('express');

const router = express.Router();

router.get("/:boardId", require('./getBoardById'))
router.get("/", require('./getBoards'))

module.exports = router;
