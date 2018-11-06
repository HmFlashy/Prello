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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const author = req.body.author;
        const cardId = req.params.cardId;
        const content = req.body.content;
        const card = await CardController.addComment(cardId, author, content);
        return res.status(200).json(card)
    } catch (error) {
        if (error.code) {
            res.status(error.code).json(error.message);
        } else {
            res.sendStatus(500);
        }
    }
}