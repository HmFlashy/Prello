const ChecklistController = require('../../../controllers/ChecklistController')
const socketIO = require('../../../../socket/index')
const logger =require('../../../../logger')

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
  *     put:
  *       tags:
  *         - Checklist
  *       description: Changes the name of the checklist
  *       summary: Changes the name of the checklist
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
        const cardId = req.params.cardId;
        const checklistId = req.params.checklistId
        const name = req.body.name
        const card = await ChecklistController.updateChecklist(cardId, checklistId, name)
        const checklists = card.checklists
        socketIO.broadcast('action', card.board, {
            type: 'UPDATED_CHECKLIST',
            payload: { _id: cardId, checklists, cardInformation: card.cardInformation }
        })
        return res.status(200).json(checklists)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message)
    }
}