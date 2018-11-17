const BoardsController = require("../../../controllers/BoardsController");
const socketIO = require("../../../../socket/index");
const throwError = require("../../../helper/RequestHelper").throwError;
const logger =require('../../../../logger')

const types = {
    name: "UPDATE_BOARD_NAME",
    visibility: "UPDATE_BOARD_VISIBILITY",
    isClosed: "UPDATE_BOARD_ISCLOSED"
};

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
 *     put:
 *       tags:
 *         - Board
 *       description: Update the role of the given member in the given board
 *       summary: Update the role of a board member
 *       parameters:
 *         - name: boardId
 *           schema:
 *             type: string
 *           description: The id of the board to update
 *           in: path
 *           required: true
 *         - name: memberId
 *           schema:
 *             type: string
 *           description: The id of the member to update
 *           in: path
 *           required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: string
 *             example:
 *               role: Admin
 *       responses:
 *         200:
 *           description: The updated board
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Member'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The board or the member was not found
 *         500:
 *           description: Internal error.
 */
module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const userId = req.params.memberId;
        const role = req.body.role;
        const boardUpdated = await BoardsController.updateRoleBoardMember(boardId, userId, role);
        if (!boardUpdated) {
            throwError(404, `The board ${boardId} was not found`)
        }
        socketIO.broadcast("action", boardId, {
            type: "UPDATED_BOARD_ROLE_MEMBER",
            payload: {boardId, memberId: userId, role}
        });
        return res.status(200).json(boardUpdated)
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};