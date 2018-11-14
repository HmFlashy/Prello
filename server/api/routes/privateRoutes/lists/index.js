const express = require('express');
const checkRightsFromList = require('../../../middlewares/checkRights').checkRightsFromList
const checkRightsFromBoard = require('../../../middlewares/checkRights').checkRightsFromBoard

const router = express.Router();

router.post('/', checkRightsFromBoard(["in:Board"], true), require('./addList'));
router.put('/:listId', checkRightsFromList(["in:Board"]), require('./updateList'));
router.delete('/:listId', checkRightsFromList(["in:Board"]), require('./deleteList'));

module.exports = router;
