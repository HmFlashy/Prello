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
        const cardId = req.params.cardId;
        const commentId = req.params.commentId;
        const content = req.body.content
        const result = await CardController.updateComment(cardId, commentId, content);
        socketIO.broadcast('action', result[1].board, {
            type: 'UPDATED_COMMENT',
            payload: {
                _id: result[1]._id, commentId, comment: { wasModified: result[0].wasModified, dateModified: result[0].dateModified, content: result[0].content }
            }
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