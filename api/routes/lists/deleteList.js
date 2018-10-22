const ListController = require('../../controllers/ListsController')
const socketIO = require('../../../socket')
const throwError = require('../../helper/RequestHelper').throwError
const throwIf = require('../helper/RequestHelper').throwIf

module.exports = async (req, res) => {
    if(!req.params.listId) throwError(400, 'Bad Request', 'missing body parameters');
    const listId = req.params.listId;
    try {
        const list = await ListController.deleteList(listId);
        throwIf(r => !r, 404, 'Not Found', 'List not found')(list);
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
        return res.status(500);
    }
};