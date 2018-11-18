const boardsController = require('../../../controllers/BoardsController');
const socketIO = require('../../../../socket/index');
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
 *   /boards/{boardId}/teams/{teamId}:
 *     post:
 *       tags:
 *         - Board
 *       description: Delete a team from a board given the boardId and the teamId
 *       summary: Delete a team from a board
 *       parameters:
 *         - name: boardId
 *           schema:
 *             type: string
 *           description: The id of the board.
 *           in: path
 *           required: true
 *         - name: teamId
 *           schema:
 *             type: string
 *           description: The id of the team to delete.
 *           in: path
 *           required: true
 *       requestBody:
 *         description: Optional description in *Markdown*
 *       responses:
 *         200:
 *           description: The updated board
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given board or team was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const teamId = req.params.teamId;
        const boardInfos = await boardsController.deleteBoardTeam(boardId, teamId);
        socketIO.broadcast("action", boardId, {
            type: "DELETED_BOARD_TEAM",
            payload: {
                teamId: teamId
            }
        });

        boardInfos[1].forEach(memberId => {
            socketIO.broadcast("action", boardId, {
                type: "DELETED_BOARD_MEMBER",
                payload: {
                    userId: req.user._id.toString(),
                    memberId
                }
            });
        });

        return res.status(200).json(boardInfos.board)
    } catch (error) {
        logger.error(error.message);
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};