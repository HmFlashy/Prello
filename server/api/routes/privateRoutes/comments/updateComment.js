const CardController = require("../../../controllers/CardsController")
const socketIO = require("../../../../socket/index")
const throwError = require("../../../helper/RequestHelper").throwError;
const { validationResult } = require('express-validator/check');

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /cards/:cardId/comments/:commentId:
 *     put:
 *       tags:
 *         - Card
 *       description: Updates a comment's content from the card
 *       summary: Updates a comment's content from the card
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                   required: true
 *             example:
 *               content: please fix board
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
        const commentId = req.params.commentId;
        const content = req.body.content
        const card = await CardController.updateComment(cardId, commentId, content);
        socketIO.broadcast('action', card.board, {
            type: 'UPDATED_COMMENT',
            payload: { _id: card._id, commentId, content }
        })
        return res.status(200).json(card)
    } catch (error) {
        if (error.code) {
            res.status(error.code).json(error.message);
        } else {
            res.sendStatus(500);
        }
    }
}