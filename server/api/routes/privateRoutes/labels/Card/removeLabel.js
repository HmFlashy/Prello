const LabelsController = require('../../../controllers/LabelsController')
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
  *   /cards/:cardId/labels:
  *     post:
  *       tags:
  *         - Label
  *       description: Removing a label from a card given its Id and the card Id
  *       summary: Removing the label from the card's list of labels in the database
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
        const labelId = req.params.labelId;
        if (!labelId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The labelId ${labelId} is malformed`)
        }
        const cardId = req.params.cardId;
        if (!cardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The cardId ${cardId} is malformed`)
        }
        const labels = await LabelsController.removeLabel(cardId, labelId)
        socketIO.broadcast('action', {
            type: 'REMOVED_LABEL',
            payload: { _id: cardId, labels }
        })
        return res.status(200).json(labels)
    } catch (error) {
        res.status(500).json(error.message)
    }
}