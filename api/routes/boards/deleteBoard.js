const boardsController = require('../../controllers/BoardsController');
const socketIO = require('../../../socket');
const throwError = require('../../helper/RequestHelper').throwError;

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
 *     post:
 *       tags:
 *         - Board
 *       description: Delete a board in the database
 *       summary: Delete a board in the database
 *       parameters:
 *         - name: boardId
 *           schema:
 *             type: string
 *           description: The id of the board to delete
 *           in: path
 *           required: true
 *       responses:
 *         200:
 *           description: The deleted board
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given board was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        if(!boardId) {
            throwError(400, "Missing boardId parameter")
        } else if(!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }

        const board = await boardsController.deleteBord(boardId);
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        socketIO.broadcast("action", {
            type: "DELETE_BOARD",
            payload: board
        });
        return res.status(200).json(board)
    } catch(error) {
        console.log(error);
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};