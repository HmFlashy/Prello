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
 *   /cards/:cardId/comments:
 *     post:
 *       tags:
 *         - Card
 *       description: Add a comment to the card
 *       summary: Add a comment to the card
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 author:
 *                   type: objectId
 *                   required: true
 *                 cardId:
 *                   type: ObjectId
 *                   required: true
 *                 content:
 *                   type: string
 *                   required: true
 *             example:
 *               author: 5bce3aaf84c77d0a433029a8
 *               card: 5bce3aaf84c77d0a433029a9
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
        const author = req.body.author;
        const cardId = req.params.cardId;
        const content = req.body.content;
        const result = await CardController.addComment(cardId, author, content);
        socketIO.broadcast('action', result[1].board, {
            type: 'ADDED_COMMENT',
            payload: { _id: cardId, comment: result[0] }
        })
        return res.status(200).json(result[1])
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            res.status(error.code).json(error.message);
        } else {
            res.sendStatus(500);
        }
    }
}