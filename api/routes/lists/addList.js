const ListController = require('../../controllers/ListsController')
const socketIO = require('../../../socket')

module.exports = async (req, res) => {
    const name = req.body.name;
    const boardID = req.body.boardID;
    try {
        const list = await ListController.addList(name, boardID);
        socketIO.broadcast('action', {
            type: 'ADD_LIST',
            payload: list
        });
        return res.status(200).json(list)
    } catch(error) {
        res.status(500).json(error.message)
    }
}