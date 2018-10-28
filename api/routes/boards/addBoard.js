const boardsController = require('../../controllers/BoardsController');
const socketIO = require('../../../socket');
const throwError = require('../../helper/RequestHelper').throwError;

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
 *           description: The request was malformed or the given board or given team was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        console.log(req)
        const name = req.body.name;
        const visibility = req.body.visibility;
        const teamId = req.body.teamId;
        const userId = req.body.userId;
        if(!name) {
            throwError(400, "Missing name parameter")
        }
        if(!visibility) {
            throwError(400, "Missing visibility parameter")
        }
        if (teamId) {
            if(!teamId.match(/^[0-9a-fA-F]{24}$/)) {
                throwError(400, `The teamId ${teamId} is malformed`)
            }
        }
        if(!userId) {
            throwError(400, "Missing userId parameter")
        } else if(!userId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The userId ${userId} is malformed`)
        }

        const board = await boardsController.addBoard(name, visibility, teamId, userId,
            );
        socketIO.broadcast("action", {
            type: "ADD_BOARD",
            payload: board
        });
        return res.status(201).json(board)
    } catch(error) {
        console.log(error);
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};