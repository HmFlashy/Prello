const ListController = require('../../controllers/ListsController')
const socketIO = require('../../../socket')

module.exports = async (req, res) => {
    const listId = req.params.listId
    try {
        const listUpdated = await ListController.updateList(listId, req.body)
        if(listUpdated) {
            switch (req.body) {
                case 'name' in Object.keys(req.body):
                    socketIO.broadcast('action', {
                        type: 'UPDATE_LIST_NAME',
                        payload: listUpdated
                    });
                case 'isArchived' in Object.keys(req.body):
                    socketIO.broadcast('action', {
                        type: 'ARCHIVED_LIST',
                        payload: listUpdated
                    });
                default:
                    break;
            }
            return res.status(200).json(listUpdated)
        } else {
            return res.status(404).json({
                message: `The list ${listId} does not exist`
            })
        }
    } catch(error) {
        return res.status(500).json(error.message)
    }
}