const BoardsController = require('../../../controllers/BoardsController');
const socketIO = require('../../../../socket');
const throwError = require('../../../helper/RequestHelper').throwError;

const types = {
    name: 'UPDATE_BOARD_NAME',
    visibility: 'UPDATE_BOARD_VISIBILITY',
    isClosed: 'UPDATE_BOARD_ISCLOSED'
};

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /boards/{boardId}:
 *     put:
 *       tags:
 *         - Board
 *       description: Update attributes of the given board. Attributes can be => name, isClosed, visibility. You can change any number of those fields in one call.
 *       summary: Update attributes of the given board.
 *       parameters:
 *         - name: boardId
 *           schema:
 *             type: string
 *           description: The id of the board to update
 *           in: path
 *           required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 visibility:
 *                   type: string
 *                 isClosed:
 *                   type: boolean
 *             example:
 *               name: my super name
 *               visibility: public
 *               isClosed: true
 *       responses:
 *         200:
 *           description: The updated board
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         400:
 *           description: The request was malformed or the board was not found
 *         500:
 *           description: Internal error.
 */
module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        if(!boardId) {
            throwError(400, "Missing boardId parameter")
        }
        if(!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }
        const boardUpdated = await BoardsController.updateBoard(boardId, req.body);
        if(!boardUpdated) {
            throwError(400, `The board ${boardId} was not found`)
        }
        Object.keys(req.body).forEach(action => {
            if (types[action]) {
                socketIO.broadcast('action', {
                    type: types[action],
                    payload: { [action]: boardUpdated[action], "_id": boardUpdated._id }
                })
            }
        });
        return res.status(200).json(boardUpdated)
    } catch(error) {
        console.log(error)
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};