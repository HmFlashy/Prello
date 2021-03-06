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
  *       description: Updating a label from a board given its Id and the board Id
  *       summary: Updating a label in the database
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
        const labelId = req.params.labelId
        const boardId = req.params.boardId;
        const labelUpdated = await LabelsController.updateLabel(labelId, req.body)
        if (labelUpdated) {
            socketIO.broadcast('action', boardId, {
                type: 'UPDATED_LABEL',
                payload: { boardId: boardId, labelUpdated: labelUpdated }

            })
            return res.status(200).json({
                type: "Success",
                message: "Label found",
                data: labelUpdated
            })
        }
        else {
            return res.status(404).json({
                type: "Error",
                message: `The label ${idLabel} does not exist`
            })
        }
    } catch (error) {
        logger.error(error.message)
        (error.code)
            ? res.status(error.code).json(error.message)
            : res.sendStatus(500);

    }
}