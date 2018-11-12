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
 *   /teams:
 *     post:
 *       tags:
 *         - Team
 *       description: Delete a team given its id
 *       summary: Delete a team in the database
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
 *                 
 *             example:
 *               teamId: 5bce3aaf84c77d0a433029a9
 *       responses:
 *         200:
 *           description: The deleted team
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Team'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given team was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const teamId = req.creatorId;
        if (!teamId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The teamId ${teamId} is malformed`)
        }
        const team = await teamsController.deleteTeam(teamId);
        socketIO.broadcast('action',{
            type: 'DELETED_TEAM',
            payload: { _id: teamId, team }
        })
        return res.status(201).json(team)
    } catch(error) {
        console.log(error);
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};