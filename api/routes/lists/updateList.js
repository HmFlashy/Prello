const ListController = require('../../controllers/ListsController');
const socketIO = require('../../../socket');
const throwError = require('../../helper/RequestHelper').throwError;

module.exports = async (req, res) => {
    try {
        if(!req.params.listId) {
            throwError(400, "Bad Request", "Missing listId parameter")
        }
        const listId = req.params.listId;
        const listUpdated = await ListController.updateList(listId, req.body);
        if(!listUpdated) {
            throwError(400, "List not found")
        }
        switch (req.body) {
            case 'name' in Object.keys(req.body):
                socketIO.broadcast('action', {
                    type: 'UPDATE_LIST_NAME',
                    payload: listUpdated
                });
                break;
            case 'isArchived' in Object.keys(req.body):
                socketIO.broadcast('action', {
                    type: 'ARCHIVED_LIST',
                    payload: listUpdated
                });
                break;
            default:
                break;
        }
        return res.status(200).json({
            type: "Success",
            message: "List updated",
            data: listUpdated
        })
    } catch(error) {
        console.log(error)
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};