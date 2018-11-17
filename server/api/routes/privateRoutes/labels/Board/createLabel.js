const LabelsController = require('../../../../controllers/LabelsController')
const socketIO = require('../../../../../socket')
const logger = require('../../../../../logger')

/**
  * @swagger
  * definition:
  *   NewList:
  *     properties:
  *       name:
  *         type: string
  *
  * paths:
  *   /boards/:boardId/labels:
  *     post:
  *       tags:
  *         - Label
  *       description: Creating a new label for a board given its name, color and the board Id
  *       summary: Creating a label in the database
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
  *                 color:
  *                   type: string
  *                   required: true
  *             example: 
  *               name: my super name
  *               color: my super color
  *       responses:
  *         200:
  *           description: The updated Board
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Board'
  *         400:
  *           description: The request was malformed
  *         500:
  *           description: Internal error
  */
module.exports = async (req, res) => {
    try {
        const name = req.body.name;
        const color = req.body.color;
        const boardId = req.params.boardId;
        const label = await LabelsController.createLabel(name, color, boardId)
        socketIO.broadcast('action', boardId, {
            type: 'CREATED_LABEL',
            payload: { boardId: boardId, label }
        })
        return res.status(200).json(label)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message)
    }
}