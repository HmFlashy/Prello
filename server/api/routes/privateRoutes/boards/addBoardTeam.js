const boardsController = require('../../../controllers/BoardsController');
const socketIO = require('../../../../socket/index');
const throwError = require('../../../helper/RequestHelper').throwError;
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
 *   /boards/{boardId}/teams:
 *     post:
 *       tags:
 *         - Board
 *       description: Add a team to the board either by giving the name or the teamId
 *       summary: Add a team to the board
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
 *                 name:
 *                   type: ObjectId
 *             example:
 *               _id: 5bce3aaf84c77d0a433029a9
 *               name: Khal
 *       responses:
 *         200:
 *           description: The updated board with the team added
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
        const teamId = req.body.teamId;
        const board = await boardsController.addBoardTeam(boardId, teamId);
        socketIO.broadcast("action", boardId, {
            type: "ADD_BOARD_TEAM",
            payload: {
                teams: board.teams,
                members: board.members
            }
        });
        return res.status(200).json(board)
    } catch (error) {
        logger.error(error.message);
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};