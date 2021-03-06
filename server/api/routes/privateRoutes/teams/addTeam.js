const TeamsController = require('../../../controllers/TeamsController');
const socketIO = require('../../../../socket/index');
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
        const team = await TeamsController.addTeam(name, creatorId);
        socketIO.broadcast('action', creatorId, {
            type: 'CREATED_TEAM',
            payload: { team }
        })
        return res.status(201).json(team)
    } catch (error) {
        logger.error(error.message);
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};