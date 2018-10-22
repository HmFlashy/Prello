const ListController = require('../../controllers/ListsController');
const socketIO = require('../../../socket');
const throwError = require('../../helper/RequestHelper').throwError;

module.exports = async (req, res) => {
    if(!req.params.listId) {
        throwError(400, "Missing listId parameter")
    }
    const listId = req.params.listId;
    try {
        const list = await ListController.deleteList(listId);
        if(!list) {
            throwError(400, "List not found")
        }
        socketIO.broadcast('action', {
            type: 'DELETE_LIST',
            payload: list
        });
        return res.status(204).json({
            type: 'Success',
            message: 'List deleted',
            data: list
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