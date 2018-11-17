const CardController = require("../../../controllers/CardsController")
const socketIO = require("../../../../socket/index")
const logger =require('../../../../logger')

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /cards/:cardId/attachments/:attachmentId:
 *     delete:
 *       tags:
 *         - Card
 *       description: Deletes an attachment to the card
 *       summary: Deletes an attachment to the card
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
        const cardId = req.params.cardId;
        const attachmentId = req.params.attachmentId;
        const card = await CardController.deleteAttachment(cardId, attachmentId)
        socketIO.broadcast("action", card.board, {
            type: "REMOVE_CARD_ATTACHMENT",
            payload: { _id: cardId, attachmentId }
        });
        res.status(200).send(card)
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            res.status(error.code).json(error.message);
        } else {
            res.sendStatus(500);
        }
    }
}