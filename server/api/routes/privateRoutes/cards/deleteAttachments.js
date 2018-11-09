const CardController = require("../../../controllers/CardsController")
const ListController = require("../../../controllers/ListsController")
const socketIO = require("../../../../socket/index")
const throwError = require("../../../helper/RequestHelper").throwError;
const { validationResult } = require('express-validator/check');
const S3 = require("../../../S3Service.js")

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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const cardId = req.params.cardId;
        const attachmentId = req.params.attachmentId;
        card = await CardController.deleteAttachment(cardId, attachmentId)
        socketIO.broadcast("action", card.board, {
            type: "REMOVE_CARD_ATTACHMENT",
            payload: { _id: cardId, attachmentId }
        });
        res.status(200).send(card)
    } catch (error) {
        console.log(error)
        if (error.code) {
            res.status(error.code).json(error.message);
        } else {
            res.sendStatus(500);
        }
    }
}