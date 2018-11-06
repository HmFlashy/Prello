const express = require('express');

const router = express.Router();

router.delete('/boardStars/:boardId', require('./unstarBoard'));
router.post('/boardStars/:boardId', require('./starBoard'));
router.get('/', require('./getUsersWithQuery'));

module.exports = router;