const express = require('express');
const checkRightsFromCard = require('../../../middlewares/checkRights').checkRightsFromCard
const checkRightsFromList = require('../../../middlewares/checkRights').checkRightsFromList
const { cardValidator, commentValidator, attachmentValidator } = require('../../../validations/privateRoutes');

const router = express.Router();

router.post('/', cardValidator.addCardValidator, checkRightsFromList(["in:Board"], true), require('./addCard'));
router.get('/', require('./getCards'));
router.get('/:cardId', checkRightsFromCard(["in:Board"]), require('./getCardById'));
router.put('/:cardId', checkRightsFromCard(["in:Board"]), require('./updateCard'));
router.put('/:cardId/move', checkRightsFromCard(["in:Board"]), require('./moveCardById'));
router.delete('/:cardId', checkRightsFromCard(["in:Board"]), require('./deleteCard'));

router.post('/:cardId/field/:field', checkRightsFromCard(["in:Board"]), require('./arrays/addValToField'));
router.delete('/:cardId/field/:field', checkRightsFromCard(["in:Board"]), require('./arrays/removeValToField'));

router.post('/:cardId/checklists', checkRightsFromCard(["in:Board"]), require('../checklists/addChecklist'));
router.delete('/:cardId/checklists/:checklistId', checkRightsFromCard(["in:Board"]), require('../checklists/deleteChecklist'));
router.put('/:cardId/checklists/:checklistId', checkRightsFromCard(["in:Board"]), require('../checklists/updateChecklist'));

router.post('/:cardId/checklists/:checklistId/items', checkRightsFromCard(["in:Board"]), require('../checklists/Item/addItem'));
router.delete('/:cardId/checklists/:checklistId/items/:itemId', checkRightsFromCard(["in:Board"]), require('../checklists/Item/deleteItem'));
router.put('/:cardId/checklists/:checklistId/items/:itemId', checkRightsFromCard(["in:Board"]), require('../checklists/Item/updateItem'));

router.post('/:cardId/comments', commentValidator.addCommentValidator, checkRightsFromCard(["in:Board"]), require('../comments/addComment'));
router.delete('/:cardId/comments/:commentId', commentValidator.deleteCommentValidator, checkRightsFromCard(["in:Board"]), require('../comments/deleteComment'));
router.put('/:cardId/comments/:commentId', commentValidator.updateCommentValidator, checkRightsFromCard(["in:Board"]), require('../comments/updateComment'));

router.put('/:cardId/labels/:labelId', checkRightsFromCard(["in:Board"]), require('../labels/Card/addLabel'));
router.delete('/:cardId/labels/:labelId', checkRightsFromCard(["in:Board"]), require('../labels/Card/removeLabel'));

router.post('/:cardId/attachments', attachmentValidator.addAttachmentValidator, checkRightsFromCard(["in:Board"]), require('./addAttachments'));
router.delete('/:cardId/attachments/:attachmentId', attachmentValidator.deleteAttachmentValidator, checkRightsFromCard(["in:Board"]), require('./deleteAttachments'));


module.exports = router;
