const express = require('express');

const router = express.Router();

router.post('/', require('./addCard'));
router.get('/', require('./getCards'));
router.get('/:cardId', require('./getCardById'));
router.put('/:cardId', require('./updateCard'));
router.put('/:cardId/move', require('./moveCardById'));

router.post('/:cardId/field/:field', require('./arrays/addValToField'));
router.delete('/:cardId/field/:field', require('./arrays/removeValToField'));

router.post('/:cardId/checklists', require('../checklists/addChecklist'));
router.delete('/:cardId/checklists/:checklistId', require('../checklists/deleteChecklist'));
router.put('/:cardId/checklists/:checklistId', require('../checklists/updateChecklist'));

router.post('/:cardId/checklists/:checklistId/items', require('../checklists/Item/addItem'));
router.delete('/:cardId/checklists/:checklistId/items/:itemId', require('../checklists/Item/deleteItem'));
router.put('/:cardId/checklists/:checklistId/items/:itemId', require('../checklists/Item/updateItem'));


module.exports = router;
