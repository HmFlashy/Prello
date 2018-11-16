const CardController = require('../../../controllers/CardsController')
const ChecklistController = require('../../../controllers/ChecklistController')
const socketIO = require('../../../../socket/index')
const throwError = require('../../../helper/RequestHelper').throwError;

/**
  * @swagger
  * definition:
  *   NewList:
  *     properties:
  *       name:
  *         type: string
  *
  * paths:
  *   /cards/:cardId/checklists/:checklistId:
  *     delete:
  *       tags:
  *         - Checklist
  *       description: Delete the checklist corrensponding to the given Id
  *       summary: Delete the checklist
  *       responses:
  *         200:
  *           description: The updated card
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Card'
  *         400:
  *           description: The request was malformed
  *         500:
  *           description: Internal error
  */
module.exports = async (req, res) => {
    try {
        const cardId = req.params.cardId;
        const checklistId = req.params.checklistId
        const card = await ChecklistController.deleteChecklist(cardId, checklistId)
        const checklists = card.checklists
        socketIO.broadcast('action', card.board, {
            type: 'DELETED_CHECKLIST',
            payload: { _id: cardId, checklists, cardInformation: card.cardInformation }
        })
        return res.status(200).json(checklists)
    } catch (error) {
        res.status(500).json(error.message)
    }
}