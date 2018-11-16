const teamsController = require('../../../controllers/TeamsController');
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
        if (!teamId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The teamId ${teamId} is malformed`)
        }
        if (Object.keys(req.body).length === 0) {
            throwError(400, "No data in body")
        }
        const memberId = req.params.memberId;
        if (!memberId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The memberId ${memberId} is malformed`)
        }
        if (memberUpdated = await teamsController.updateTeamMember(teamId, memberId, role)) {
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
        (error.code)
            ? res.status(error.code).json(error.message)
            : res.sendStatus(500);

    }
}