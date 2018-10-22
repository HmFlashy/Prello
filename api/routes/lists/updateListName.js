const ListController = require('../../controllers/ListsController')
const socketIO = require('../../../socket')

module.exports = async (req, res) => {
    const listId = req.params.listId
    const name = req.body.name
    try {
        const listUpdated = await ListController.updateListName(listId, name)
        if(listUpdated) {
            socketIO.broadcast('action', {
                type: 'UPDATE_LIST_NAME',
                payload: listUpdated
            });
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