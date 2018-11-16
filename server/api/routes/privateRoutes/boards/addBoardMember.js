const boardsController = require("../../../controllers/BoardsController");
const socketIO = require("../../../../socket/index");
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
 *   /boards/{boardId}/members:
 *     post:
 *       tags:
 *         - Board
 *       description: Add a member to the board either by giving the email or the userId
 *       summary: Add a member to the board
 *       parameters:
 *         - name: boardId
 *           schema:
 *             type: string
 *           description: The id of the board.
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
 *                 email:
 *                   type: ObjectId
 *             example:
 *               _id: 5bce3aaf84c77d0a433029a9
 *               email: example@gmail.com
 *               name: example
 *       responses:
 *         200:
 *           description: The updated board with the member added
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
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
        const userId = req.body.userId;
        const board = await boardsController.addBoardMember(boardId, userId);
        socketIO.broadcast("action", boardId, {
            type: "ADD_BOARD_MEMBER",
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