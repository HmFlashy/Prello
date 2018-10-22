const express = require('express');

const router = express.Router();

router.post('/', require('./addList'));
router.put('/:listId', require('./updateList'));
router.delete('/:listId', require('./deleteList'));

module.exports = router;
