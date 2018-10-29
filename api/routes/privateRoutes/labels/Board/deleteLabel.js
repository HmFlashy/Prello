const LabelController = require('../../../controllers/LabelController')
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
        if (!labelId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The labelId ${labelId} is malformed`)
        }
        const boardId = req.params.boardId;
        if (!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }
        const labels = await LabelController.deleteLabel(boardId, labelId)
        socketIO.broadcast('action', {
            type: 'DELETED_LABEL',
            payload: { _id: boardId, labels }
        })
        return res.status(200).json(labels)
    } catch (error) {
        res.status(500).json(error.message)
    }
}