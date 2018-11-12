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
 *       description: Add a member in a team given the id of the team, the id of the member
 *       summary: Add a member to the team in the database
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
 *                 memberId:
 *                   type: ObjectId
 *                   required: true
 *                 
 *             example:
 *               teamId: 5be952e2a1846107b9c40da4
 *               memberId: 5bce3aaf84c77d0a433029a9
 *       responses:
 *         200:
 *           description: The updated team members
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Team'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given member or team was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        if (!teamId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The teamId ${teamId} is malformed`)
        }
        const memberId = req.params.memberId;
        if (!memberId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The memberId ${memberId} is malformed`)
        }
        const data = {member:memberId}
        const team = await TeamsController.addToArray(teamId, 'members', data)
        socketIO.broadcast('action', {
            type: 'ADDED_MEMBER_TEAM',
            payload: { _id: teamId, memberId }
        })
        return res.status(200).json(team.members)
    } catch (error) {
        res.status(500).json(error.message)
    }
}