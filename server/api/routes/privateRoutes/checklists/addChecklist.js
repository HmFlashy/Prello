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
  *   /cards/:cardId/checklists:
  *     post:
  *       tags:
  *         - Checklist
  *       description: Create a new checklist given it's name and the card Id
  *       summary: Creates a new checklist in the database
  *       requestBody:
  *         description: Optional description in *Markdown*
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
  *           description: The created checklist
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
        const card = await ChecklistController.addChecklist(name, cardId)
        const checklists = card.checklists
        socketIO.broadcast('action', card.board, {
            type: 'ADDED_CHECKLIST',
            payload: { _id: cardId, checklists, cardInformation: card.cardInformation }
        })
        return res.status(200).json(checklists)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message)
    }
}