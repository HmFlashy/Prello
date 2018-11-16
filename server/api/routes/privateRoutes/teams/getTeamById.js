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
 *     get:
 *       tags:
 *         - Label
 *       description: Get a team given its Id
 *       summary: Getting a team from the database
 *       responses:
 *         200:
 *           description: The team with the given Id
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
        const teamId = req.params.teamId;
        const team = await TeamsController.getTeamById(teamId);
        return res.status(200).json(team);
    } catch (error) {
        console.log(error)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}