const boardsController = require('../../../controllers/BoardsController');
const socketIO = require('../../../../socket/index');
const throwError = require('../../../helper/RequestHelper').throwError;

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /boards/{boardId}/members/{memberId}:
 *     delete:
 *       tags:
 *         - Board
 *       description: Delete a member from the given boardId
 *       summary: Delete a member from the board
 *       parameters:
 *         - name: boardId
 *           schema:
 *             type: string
 *           description: The id of the board.
 *           in: path
 *           required: true
 *         - name: memberId
 *           schema:
 *             type: string
 *           description: The id of the member.
 *           in: path
 *           required: true
 *       requestBody:
 *         description: Optional description in *Markdown*
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: ObjectId
 *       responses:
 *         200:
 *           description: The deleted member
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/user'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given board or user was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const userId = req.params.userId;
        const board = await boardsController.deleteBoardMember(boardId, userId);
        socketIO.broadcast("action", boardId, {
            type: "DELETED_BOARD_MEMBER",
            payload: board.members
        });
        return res.status(200).json(board)
    } catch (error) {
        console.log(error);
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};