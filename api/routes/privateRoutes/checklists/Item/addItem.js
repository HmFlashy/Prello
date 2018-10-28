const ChecklistController = require('../../../../controllers/ChecklistController')
const socketIO = require('../../../../../socket')
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
  *   /cards/:cardId/checklists/:checklistId/items:
  *     post:
  *       tags:
  *         - Checklist
  *       description: Creates a new item for the checklist
  *       summary: Creates a new item for the checklist
  *       requestBody:
  *         required: true
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                   required: true
  *             example: 
  *               name: my super name
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
        const name = req.body.name;
        const cardId = req.params.cardId;
        if (!cardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The cardId ${cardId} is malformed`)
        }
        const checklistId = req.params.checklistId;
        if (!checklistId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The checklistId ${checklistId} is malformed`)
        }
        if (Object.keys(req.body).length === 0) {
            throwError(400, "No data in body")
        }
        if (!name) {
            throwError(400, "Missing name parameter")
        }
        const checklists = await ChecklistController.addItem(cardId, checklistId, name)
        socketIO.broadcast('action', {
            type: 'ADDED_ITEM',
            payload: { _id: cardId, checklists }
        })
        return res.status(200).json(checklists)
    } catch (error) {
        res.status(500).json(error.message)
    }
}