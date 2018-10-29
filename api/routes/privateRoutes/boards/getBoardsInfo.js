const boardsController = require('../../../controllers/BoardsController');
const throwError = require("../../../helper/RequestHelper").throwError;

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /boards:
 *     get:
 *       tags:
 *         - Board
 *       description: Fetches the infos of all the boards
 *       summary: Fetches the infos of all the  boards
 *       responses:
 *         200:
 *           description: The boards infos
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        if (!boardId) {
            throwError(400, "Missing boardId parameter")
        } else if (!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }
        const boards = await boardsController.getBoardsInfo(boardId);
        return res.status(200).json(boards)
    } catch (error) {
        console.log(error)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}