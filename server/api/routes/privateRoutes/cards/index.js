const express = require('express');
const { cardValidator, commentValidator } = require('../../../validations/privateRoutes');

const router = express.Router();

router.post('/', cardValidator.addCardValidator, require('./addCard'));
router.get('/', require('./getCards'));
router.get('/:cardId', require('./getCardById'));
router.put('/:cardId', require('./updateCard'));
router.put('/:cardId/move', require('./moveCardById'));
router.delete('/:cardId', require('./deleteCard'));

router.post('/:cardId/field/:field', require('./arrays/addValToField'));
router.delete('/:cardId/field/:field', require('./arrays/removeValToField'));

router.post('/:cardId/checklists', require('../checklists/addChecklist'));
router.delete('/:cardId/checklists/:checklistId', require('../checklists/deleteChecklist'));
router.put('/:cardId/checklists/:checklistId', require('../checklists/updateChecklist'));

router.post('/:cardId/checklists/:checklistId/items', require('../checklists/Item/addItem'));
router.delete('/:cardId/checklists/:checklistId/items/:itemId', require('../checklists/Item/deleteItem'));
router.put('/:cardId/checklists/:checklistId/items/:itemId', require('../checklists/Item/updateItem'));

router.post('/:cardId/comments', commentValidator.addCommentValidator, require('../comments/addComment'));
router.delete('/:cardId/comments/:commentId', commentValidator.deleteCommentValidator, require('../comments/deleteComment'));
router.put('/:cardId/comments/:commentId', commentValidator.updateCommentValidator, require('../comments/updateComment'));

module.exports = router;
