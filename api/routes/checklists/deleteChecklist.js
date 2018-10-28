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
        if (!cardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The cardId ${cardId} is malformed`)
        }
        const checklistId = req.params.checklistId
        if (!checklistId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The checklistId ${checklistId} is malformed`)
        }
        const checklists = await ChecklistController.deleteChecklist(cardId, checklistId)
        socketIO.broadcast('action', {
            type: 'DELETED_CHECKLIST',
            payload: { _id: cardId, checklists }
        })
        return res.status(200).json(checklists)
    } catch (error) {
        res.status(500).json(error.message)
    }
}