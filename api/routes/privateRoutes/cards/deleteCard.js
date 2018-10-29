const CardController = require('../../../controllers/CardsController')
const socketIO = require('../../../../socket')
const throwError = require('../../../helper/RequestHelper').throwError;

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /cards:
 *     delete:
 *       tags:
 *         - Card
 *       description: Delete a card
 *       summary: Delete a card in the database
 *       parameters:
 *         - name: cardId
 *           schema:
 *             type: string
 *           description: The id of the card to delete
 *           in: path
 *           required: true
 *       responses:
 *         200:
 *           description: The deleted card
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Card'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The card was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const cardId = req.params.cardId;
        if (!cardId) {
            throwError(400, "Missing cardId parameter")
        } else if(!cardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The cardId ${cardId} is malformed`)
        }
        const card = await CardController.deleteCard(cardId);
        socketIO.broadcast('action', {
            type: 'DELETE_CARD',
            payload: card
        });
        return res.status(200).json(card)
    } catch (error) {
        console.log(error)
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}