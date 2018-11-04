const ListController = require('../../../controllers/ListsController');
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
 *   /lists/{listId}:
 *     delete:
 *       tags:
 *         - List
 *       description: Delete a list given its id
 *       summary: Delete the list in the database
 *       parameters:
 *         - name: listId
 *           schema:
 *             type: string
 *           description: The id of the list.
 *           in: path
 *           required: true
 *       responses:
 *         200:
 *           description: Nothing
 *         400:
 *           description: The request was malformed or the given list was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const listId = req.params.listId;
        if(!listId) {
            throwError(400, "Missing listId parameter")
        }
        if(!listId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The listId ${listId} is malformed`)
        }
        const list = await ListController.deleteList(listId);
        if(!list) {
            throwError(400, `The list ${listId} does not exist`)
        }
        socketIO.broadcast('action', {
            type: 'DELETE_LIST',
            payload: list
        });
        return res.status(200).json(list)
    } catch(error) {
        console.log(error);
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};