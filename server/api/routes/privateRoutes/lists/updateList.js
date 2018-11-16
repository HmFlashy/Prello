const ListController = require('../../../controllers/ListsController');
const socketIO = require('../../../../socket/index');
const throwError = require('../../../helper/RequestHelper').throwError;

const types = {
    name: 'UPDATE_LIST_NAME',
    isArchived: 'UPDATE_LIST_ISARCHIVED',
    boardId: 'UPDATE_LIST_BOARD',
    pos: 'MOVE_LIST'
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
 *   /lists/{listId}:
 *     put:
 *       tags:
 *         - List
 *       description: Update attributes of the given list. Attributes can be => name, pos, boardId, archive. You can change any number of those fields in one call.
 *       summary: Update attributes of the given list.
 *       parameters:
 *         - name: listId
 *           schema:
 *             type: string
 *           description: The id of the list to update
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
 *                 board:
 *                   type: ObjectId
 *                 pos:
 *                   type: int
 *                 isArchived:
 *                   type: boolean
 *             example:
 *               name: my super name
 *               isArchived: true
 *               boardId: 5bce3aaf84c77d0a433029a9
 *               pos: 100000
 *       responses:
 *         200:
 *           description: The updated list
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/List'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The list was not found
 *         500:
 *           description: Internal error.
 */
module.exports = async (req, res) => {
    try {
        const listId = req.params.listId;
        if (!listId) {
            throwError(400, "Missing listId parameter")
        }
        if (!listId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The listId ${listId} is malformed`)
        }
        const listUpdated = await ListController.updateList(listId, req.body);
        if (!listUpdated) {
            throwError(400, `The listId ${listId} does not exist`)
        }
        Object.keys(req.body).forEach(action => {
            if (types[action]) {
                socketIO.broadcast('action', listUpdated.board, {
                    type: types[action],
                    payload: { [action]: listUpdated[action], "_id": listUpdated._id }
                })
            }
        });
        return res.status(200).json(listUpdated)
    } catch (error) {
        console.log(error)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};