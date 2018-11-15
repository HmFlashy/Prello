const pollController = require('../../../controllers/PollController');
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
 *   /boards:
 *     post:
 *       tags:
 *         - Board
 *       description: Create a new board given a name, a visibility, the id of the creator and optionally the id of the team
 *       summary: Creates a new board in the database
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
 *                 ownerId:
 *                   type: ObjectId
 *                   required: true
 *                 teamId:
 *                   type: ObjectId
 *                   required: false
 *                 visibility:
 *                   type: String
 *                   required: true
 *             example:
 *               name: my super name
 *               ownerId: 5bce3aaf84c77d0a433029a9
 *               teamId: 5bce3aaf84c77d0a433029a9
 *               visibility: private
 *       responses:
 *         200:
 *           description: The created board
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given board or team was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {

};