const ChecklistController = require('../../controllers/ChecklistController')
const socketIO = require('../../../socket')
const throwError = require('../../helper/RequestHelper').throwError;

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
        socketIO.broadcast('action', {
            type: 'UPDATE_CHECKLIST',
            payload: card
        })
        return res.status(200).json(card)
    } catch (error) {
        res.status(500).json(error.message)
    }
}