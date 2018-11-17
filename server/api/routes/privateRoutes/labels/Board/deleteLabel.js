const LabelsController = require('../../../../controllers/LabelsController')
const socketIO = require('../../../../../socket')
const logger =require('../../../../../logger')

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
  *       description: Deleting a label from a board given its Id and the board Id
  *       summary: Deleting a label in the database
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
        const labelId = req.params.labelId;
        const boardId = req.params.boardId;
        const label = await LabelsController.deleteLabel(boardId, labelId)
        socketIO.broadcast('action', boardId, {
            type: 'DELETED_LABEL',
            payload: { boardId: boardId, label }
        })
        return res.status(200).json(label)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message)
    }
}