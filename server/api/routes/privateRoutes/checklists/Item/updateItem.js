const ChecklistController = require('../../../../controllers/ChecklistController')
const socketIO = require('../../../../../socket/index')
const logger = require('../../../../../logger')

const types = {
    name: 'UPDATED_ITEM_NAME',
    isChecked: 'UPDATED_ITEM_ISCHECKED',
}

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
        const checklistId = req.params.checklistId
        const itemId = req.params.itemId
        const card = await ChecklistController.updateItem(cardId, checklistId, itemId, req.body)
        const checklists = card.checklists
        Object.keys(req.body).forEach(action => {
            if (types[action]) {
                checklists.forEach(checklist => {
                    if (checklist._id == checklistId) {
                        checklist.items.forEach(item => {
                            if (item._id == itemId) {
                                socketIO.broadcast('action', card.board, {
                                    type: types[action],
                                    payload: {
                                        _id: cardId, checklists, [action]: item[action], cardInformation: card.cardInformation
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
        )
        return res.status(200).json(checklists)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message)
    }
}