const boardsController = require("../../controllers/BoardsController");
const throwError = require("../../helper/RequestHelper").throwError;

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /boards/{boardId}:
 *     get:
 *       tags:
 *         - Board
 *       description: Get a board by its id
 *       summary: Returns the board with the right ID
 *       parameters:
 *         - name: boardId
 *           schema:
 *             type: string
 *           description: The id of the board to get
 *           in: path
 *           required: true
 *       responses:
 *         200:
 *           description: The board
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         400:
 *           description: The given board was not found
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
        const board = await boardsController.getBoardById(boardId);
        if (!board) {
            throwError(400, `The boardId ${boardId} was not found`)
        }
        return res.status(200).json(board)
    } catch (error) {
        console.log(error);
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}