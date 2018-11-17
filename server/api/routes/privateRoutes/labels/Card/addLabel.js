const LabelsController = require('../../../../controllers/LabelsController')
const Card = require('../../../../models').Card
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
  *   /cards/:cardId/labels/:
  *     post:
  *       tags:
  *         - Label
  *       description: Adding a label to a card given its Id and the card Id
  *       summary: Adding the label in the card's list of labels in the database
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
        const cardId = req.params.cardId;
        const card = await Card.findById(cardId)
        const label = await LabelsController.addLabel(cardId, labelId)
        socketIO.broadcast('action', card.board, {
            type: 'ADDED_LABEL',
            payload: { _id: cardId, label }
        })
        return res.status(200).json(card.labels)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message)
    }
}