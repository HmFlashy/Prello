const TeamsController = require('../../../controllers/TeamsController');
const logger = require('../../../../logger')

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
 *       description: Remove a member in a team given the id of the team, the id of the member
 *       summary: Remove a member to the team in the database
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
        const memberId = req.params.memberId;
        const team = await TeamsController.getTeamById(teamId)
        const isInTeam = team.members.some(member => member.member._id.toString() === req.user._id.toString())
        if (isInTeam
            && team.members.some(member => member.member._id.toString() === req.user._id.toString() && member.role === "Admin")
            || isInTeam
            && memberId.toString() === req.user._id.toString()) {
            const team = await TeamsController.deleteMember(teamId, memberId)
            return res.status(200).json(team)
        } else { 
            return res.status(403)
        }
    } catch (error) {
        logger.error(error.message)
        res.status(500).json(error.message)
    }
}