const ChecklistController = require('../../../controllers/ChecklistController')
const socketIO = require('../../../../socket')
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
        socketIO.broadcast('action', {
            type: 'DELETE_ITEM',
            payload: card
        })
        return res.status(200).json(card)
    } catch (error) {
        res.status(500).json(error.message)
    }
}