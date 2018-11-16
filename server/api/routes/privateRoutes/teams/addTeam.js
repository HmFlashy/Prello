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
 *   /teams:
 *     post:
 *       tags:
 *         - Team
 *       description: Create a new team given a name, the id of the creator
 *       summary: Creates a new team in the database
 *       requestBody:
 *         description: Optional description in *Markdown*
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   required: true
 *                 creatorId:
 *                   type: ObjectId
 *                   required: true
 *                 
 *             example:
 *               name: my super name
 *               creatorId: 5bce3aaf84c77d0a433029a9
 *       responses:
 *         200:
 *           description: The created team
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
        const name = req.body.name;
        const creatorId = req.body.creator;

        if (Object.keys(req.body).length === 0) {
            throwError(400, "No data in body")
        }
        if(!name) {
            throwError(400, "Missing name parameter")
        }
        if(!creatorId) {
            throwError(400, "Missing creatorId parameter")
        }
        if (!creatorId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The creatorId ${creatorId} is malformed`)
        }
        const team = await TeamsController.addTeam(name, creatorId);
        socketIO.broadcast('action', creatorId,{
            type: 'CREATED_TEAM',
            payload: { team }
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