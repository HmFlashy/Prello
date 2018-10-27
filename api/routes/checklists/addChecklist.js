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
        const checklist = await ChecklistController.addChecklist(name, cardId)
        socketIO.broadcast('action', {
            type: 'ADD_CHECKLIST',
            payload: checklist
        })
        return res.status(200).json(checklist)
    } catch (error) {
        res.status(500).json(error.message)
    }
}