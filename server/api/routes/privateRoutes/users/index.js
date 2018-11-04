const express = require('express');

const router = express.Router();

router.delete('/:userId/boardStars/:boardId', require('./unstarBoard'));
router.post('/:userId/boardStars/:boardId', require('./starBoard'));

module.exports = router;