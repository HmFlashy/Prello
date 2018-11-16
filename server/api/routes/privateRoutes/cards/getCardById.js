const CardController = require('../../../controllers/CardsController')
const throwError = require('../../../helper/RequestHelper').throwError;
const socketIO = require('../../../../socket/index');

/**
  * @swagger
  * definition:
  *   NewList:
  *     properties:
  *       name:
  *         type: string
  *
  * paths:
  *   /cards/{cardId}:
  *     get:
  *       tags:
  *         - Card
  *       description: Fetches the card with the specified Id
  *       summary: Fetches the card with the specified Id
  *       parameters:
  *         - name: cardId
  *           schema:
  *             type: string
  *           description: The id of the card to fetch
  *           in: path
  *           required: true
  *       responses:
  *         200:
  *           description: All the cards
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
        const card = await CardController.getCardById(cardId)
        if (!card) {
            throwError(404, `The card ${cardId} was not found`)
        } else {
            return res.status(200).json(card)
        }
    } catch (error) {
        console.log(error)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}