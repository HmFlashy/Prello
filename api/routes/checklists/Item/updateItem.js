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
  *   /cards/:cardId/checklists/:checklistId/items/itemId:
  *     put:
  *       tags:
  *         - Checklist
  *       description: Updates the item
  *       summary: Updates the item
  *       requestBody:
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 isChecked:
  *                   type: string
  *             example: 
  *               name: my super name
  *               isChecked: true
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
        if (Object.keys(req.body).length === 0) {
            throwError(400, "No data in body")
        }
        const card = await ChecklistController.updateItem(cardId, checklistId, itemId, req.body)
        socketIO.broadcast('action', {
            type: 'UPDATE_ITEM',
            payload: card
        })
        return res.status(200).json(card)
    } catch (error) {
        res.status(500).json(error.message)
    }
}