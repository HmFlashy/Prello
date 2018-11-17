const express = require('express');
const checkRightsFromCard = require('../../../middlewares/checkRights').checkRightsFromCard
const checkRightsFromList = require('../../../middlewares/checkRights').checkRightsFromList
const checkRequest = require('../../../middlewares/CheckRequest')
const { cardValidator, commentValidator, attachmentValidator, checklistsValidator, labelValidator } = require('../../../validations/privateRoutes');

const router = express.Router();

router.post('/', cardValidator.addCardValidator, checkRightsFromList(["in:Board"], true), require('./addCard'));
router.get('/', require('./getCards'));
router.get('/:cardId', cardValidator.getByIdCardValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('./getCardById'));
router.put('/:cardId', cardValidator.updateCardValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('./updateCard'));
router.put('/:cardId/move', cardValidator.moveCardValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('./moveCardById'));
router.delete('/:cardId', cardValidator.deleteCardValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('./deleteCard'));

router.post('/:cardId/field/:field', cardValidator.addValToFieldCardValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('./arrays/addValToField'));
router.delete('/:cardId/field/:field', cardValidator.removeValToFieldCardValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('./arrays/removeValToField'));

router.post('/:cardId/checklists', checklistsValidator.addChecklistValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('../checklists/addChecklist'));
router.delete('/:cardId/checklists/:checklistId', checklistsValidator.deleteChecklistValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('../checklists/deleteChecklist'));
router.put('/:cardId/checklists/:checklistId', checklistsValidator.updateChecklistValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('../checklists/updateChecklist'));

router.post('/:cardId/checklists/:checklistId/items', checklistsValidator.addItemValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('../checklists/Item/addItem'));
router.delete('/:cardId/checklists/:checklistId/items/:itemId', checklistsValidator.deleteItemValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('../checklists/Item/deleteItem'));
router.put('/:cardId/checklists/:checklistId/items/:itemId', checklistsValidator.updateItemValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('../checklists/Item/updateItem'));

router.post('/:cardId/comments', commentValidator.addCommentValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('../comments/addComment'));
router.delete('/:cardId/comments/:commentId', commentValidator.deleteCommentValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('../comments/deleteComment'));
router.put('/:cardId/comments/:commentId', commentValidator.updateCommentValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('../comments/updateComment'));

router.put('/:cardId/labels/:labelId', labelValidator.addLabelCardValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('../labels/Card/addLabel'));
router.delete('/:cardId/labels/:labelId', labelValidator.removeLabelCardValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('../labels/Card/removeLabel'));

router.post('/:cardId/attachments', attachmentValidator.addAttachmentValidator, checkRightsFromCard(["in:Board"]), require('./addAttachments'));
router.delete('/:cardId/attachments/:attachmentId', attachmentValidator.deleteAttachmentValidator, checkRequest, checkRightsFromCard(["in:Board"]), require('./deleteAttachments'));


module.exports = router;
