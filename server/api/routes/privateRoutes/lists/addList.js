const ListController = require('../../../controllers/ListsController');
const socketIO = require('../../../../socket/index');
const throwError = require('../../../helper/RequestHelper').throwError;
const logger = require('../../../../logger')

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /lists:
 *     post:
 *       tags:
 *         - List
 *       description: Create a new list given it's name, the board id and it's position in the board
 *       summary: Creates a new list in the database
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
 *                 boardId:
 *                   type: ObjectId
 *                   required: true
 *                 pos:
 *                   type: int
 *                   required: true
 *             example:
 *               name: my super name
 *               boardId: 5bce3aaf84c77d0a433029a9
 *               pos: 100000
 *       responses:
 *         200:
 *           description: The created list
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/List'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given board was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const name = req.body.name;
        const boardId = req.body.boardId;
        const pos = req.body.pos;
        const list = await ListController.addList(name, boardId, pos);
        if (!list) {
            throwError(500, "Internal server issue")
        }
        socketIO.broadcast("action", boardId, {
            type: "ADD_LIST",
            payload: list
        });
        return res.status(201).json(list)
    } catch (error) {
        logger.error(error.message);
        if (error.code) {
            return res.status(error.code).json({ message: error.message })
        } else {
            return res.sendStatus(500);
        }
    }
}
