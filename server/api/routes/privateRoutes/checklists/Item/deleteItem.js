const CardController = require('../../../../controllers/CardsController')
const ChecklistController = require('../../../../controllers/ChecklistController')
const socketIO = require('../../../../../socket/index')
const throwError = require('../../../../helper/RequestHelper').throwError;

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
        if (!cardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The cardId ${cardId} is malformed`)
        }
        const checklistId = req.params.checklistId
        if (!checklistId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The checklistId ${checklistId} is malformed`)
        }
        const itemId = req.params.itemId
        if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The itemId ${itemId} is malformed`)
        }
        const card = await ChecklistController.deleteItem(cardId, checklistId, itemId)
        const checklists = card.checklists
        console.log("CARD:   " + card.board)
        socketIO.broadcast('action', card.board, {
            type: 'DELETED_ITEM',
            payload: { _id: cardId, checklists, cardInformation: card.cardInformation }
        })
        return res.status(200).json(checklists)
    } catch (error) {
        res.status(500).json(error.message)
    }
}