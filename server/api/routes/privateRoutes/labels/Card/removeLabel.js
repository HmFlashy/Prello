const CardsController = require('../../../../controllers/CardsController')
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
        const cardId = req.params.cardId;
        const card = await Card.findById(cardId)
        const labels = await CardsController.removeToArray(cardId, 'labels', labelId)
        socketIO.broadcast('action', card.board, {
            type: 'REMOVED_LABEL',
            payload: { _id: cardId, labelId }
        })
        return res.status(200).json(labels)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message)
    }
}