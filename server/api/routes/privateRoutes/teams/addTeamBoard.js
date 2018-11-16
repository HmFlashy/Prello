const TeamsController = require('../../../controllers/TeamsController');
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
 *   /teams/:teamId:
 *     post:
 *       tags:
 *         - Team
 *       description: Add a board in a team given the id of the team, the id of the board
 *       summary: Add a board to the team in the database
 *       requestBody:
 *         description: Optional description in *Markdown*
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teamId:
 *                   type: ObjectId
 *                   required: true
 *                 boardId:
 *                   type: ObjectId
 *                   required: true
 *                 
 *             example:
 *               teamId: 5be952e2a1846107b9c40da4
 *               boardId: 5bce3aaf84c77d0a433029a9
 *       responses:
 *         200:
 *           description: The updated team boards
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Team'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given board or team was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        if (!teamId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The teamId ${teamId} is malformed`)
        }
        const boardId = req.params.boardId;
        if (!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }
        const team = await TeamsController.addBoard(teamId, boardId)
        socketIO.broadcast('action', {
            type: 'ADDED_BOARD_TEAM',
            payload: { _id: teamId, boardId }
        })
        return res.status(200).json(team.boards)
    } catch (error) {
        res.status(500).json(error.message)
    }
}