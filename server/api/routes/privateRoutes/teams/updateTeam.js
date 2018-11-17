const TeamsController = require('../../../controllers/TeamsController')
const socketIO = require('../../../../socket')
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
  *       description: Updating a team given its Id
  *       summary: Updating a team in the database
  *       responses:
  *         200:
  *           description: The updated Team
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
        if (teamUpdated = await TeamsController.updateTeam(teamId, req.body)) {
            socketIO.broadcast('action', teamId, {
                type: 'UPDATED_TEAM',
                payload: { teamId: teamId, teamUpdated }

            })
            return res.status(200).json({
                type: "Success",
                message: "Team found",
                data: teamUpdated
            })
        }
        else {
            return res.status(404).json({
                type: "Error",
                message: `The team ${teamId} does not exist`
            })
        }
    } catch (error) {
        (error.code)
            ? res.status(error.code).json(error.message)
            : res.sendStatus(500);

    }
}