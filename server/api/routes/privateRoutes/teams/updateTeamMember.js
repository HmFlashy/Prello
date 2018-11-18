const teamsController = require('../../../controllers/TeamsController');
const socketIO = require('../../../../socket/index');

/**
  * @swagger
  * definition:
  *   NewList:
  *     properties:
  *       name:
  *         type: string
  *
  * paths:
  *   /teams/:teamId/members/:memberId:
  *     post:
  *       tags:
  *         - Team
  *       description: Updating a member from a team given its Id and the team Id
  *       summary: Updating a team member in the database
  *       responses:
  *         200:
  *           description: The updated member
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Team'
  *         400:
  *           description: The request was malformed
  *         500:
  *           description: Internal error
  */
module.exports = async (req, res) => {
    try {
        const teamId = req.params.teamId
        const role = req.body.role
        const memberId = req.params.memberId;
        const memberUpdated = await teamsController.updateTeamMember(teamId, memberId, role)
        if (memberUpdated) {
            socketIO.broadcast('action', {
                type: 'UPDATED_TEAM_MEMBER',
                payload: { memberId: memberId, memberUpdated }

            })
            return res.status(200).json({
                type: "Success",
                message: "Member found",
                data: memberUpdated
            })
        }
        else {
            return res.status(404).json({
                type: "Error",
                message: `The member ${memberId} does not exist`
            })
        }
    } catch (error) {
        lengthlogogger.error(error.message)
        (error.code)
            ? res.status(error.code).json(error.message)
            : res.sendStatus(500);

    }
}