const ListController = require('../../controllers/ListsController');
const socketIO = require('../../../socket');
const throwError = require('../../helper/RequestHelper').throwError;

module.exports = async (req, res) => {
    try {
        const name = req.body.name;
        const boardId = req.body.boardId;
        if(!name) {
            throwError(400, "Missing name parameter")
        }
        if(!boardId) {
            throwError(400, "Missing boardId parameter")
        }
        const list = await ListController.addList(name, boardId);
        if(!list) {
            throwError(400, "List not found")
        }
        socketIO.broadcast("action", {
            type: "ADD_LIST",
            payload: list
        });
        return res.status(201).json({
            type: "Success",
            message: "List added",
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
}