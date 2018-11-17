const CardController = require("../../../controllers/CardsController")
const ListController = require("../../../controllers/ListsController")
const socketIO = require("../../../../socket/index")
const throwError = require("../../../helper/RequestHelper").throwError;
const { validationResult } = require('express-validator/check');
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
 *   /cards:
 *     post:
 *       tags:
 *         - Card
 *       description: Create a new card given it's name, creator the list id, the board id and it's position in the list
 *       summary: Creates a new card in the database
 *       requestBody:
 *         description: Optional description in *Markdown*
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   required: true
 *                 creator:
 *                   type: ObjectId
 *                   required: true
 *                 listId:
 *                   type: ObjectId
 *                   required: true
 *                 boardId:
 *                   type: ObjectId
 *                   required: true
 *                 pos:
 *                   type: int
 *                   required: true
 *             example:
 *               name: my super name
 *               creator: 5bce3aaf84c77d0a433029a9
 *               listId: 5bce3aaf84c77d0a433029a9
 *               boardId: 5bce3aaf84c77d0a433029a9
 *               pos: 100000
 *       responses:
 *         200:
 *           description: The created card
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
        const name = req.body.name;
        const listId = req.body.listId;
        const pos = req.body.pos
        const card = await CardController.addCard(name, listId, pos);
        if (!card) throwError(500);

        socketIO.broadcast("action", card.board, {
            type: "ADD_CARD",
            payload: card
        });
        return res.status(200).json(card)
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            res.status(error.code).json(error.message);
        } else {
            res.sendStatus(500);
        }
    }
}