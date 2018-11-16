const express = require('express');
const checkRightsFromList = require('../../../middlewares/checkRights').checkRightsFromList
const checkRightsFromBoard = require('../../../middlewares/checkRights').checkRightsFromBoard
const { listValidator } = require('../../../validations/privateRoutes');
const checkRequest = require('../../../middlewares/CheckRequest')

const router = express.Router();

router.post('/', listValidator.addListValidator, checkRequest, checkRightsFromBoard(["in:Board"], true), require('./addList'));
router.put('/:listId', listValidator.updateListValidator, checkRequest, checkRightsFromList(["in:Board"]), require('./updateList'));
router.delete('/:listId', listValidator.deleteListValidator, checkRequest, checkRightsFromList(["in:Board"]), require('./deleteList'));

module.exports = router;
