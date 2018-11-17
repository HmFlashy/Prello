const ChecklistController = require('../../../../controllers/ChecklistController')
const socketIO = require('../../../../../socket/index')
const logger = require('../../../../../logger')

/**
  * @swagger
  * definition:
  *   NewList:
  *     properties:
  *       name:
  *         type: string
  *
  * paths:
  *   /cards/:cardId/checklists/:checklistId/items/:itemId:
  *     delete:
  *       tags:
  *         - Checklist
  *       description: Delete the item from the corrensponding checklist
  *       summary: Delete the item
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
        const itemId = req.params.itemId
        const card = await ChecklistController.deleteItem(cardId, checklistId, itemId)
        const checklists = card.checklists
        socketIO.broadcast('action', card.board, {
            type: 'DELETED_ITEM',
            payload: { _id: cardId, checklists, cardInformation: card.cardInformation }
        })
        return res.status(200).json(checklists)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message)
    }
}