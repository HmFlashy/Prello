const ListController = require('../../controllers/ListsController');
const socketIO = require('../../../socket');
const throwError = require('../../helper/RequestHelper').throwError;
const throwIf = require('../../helper/RequestHelper').throwIf;

module.exports = async (req, res) => {
    if(!req.body.name) throwError(400, 'Bad Request', 'Missing name parameter');
    if(!req.body.boardId) throwError(400, 'Bad Request', 'Missing boardId parameter');
    const name = req.body.name;
    const boardId = req.body.boardId;
    try {
        const list = await ListController.addList(name, boardId);
        console.log(list)
        throwIf(r => !r, 404, "Not Found", "List not found")(list);
        socketIO.broadcast("action", {
            type: "ADD_LIST",
            payload: list
        });
        return res.sendStatus(201).json({
            type: "Success",
            message: "List added",
            data: list
        })
    } catch(error) {
        return res.sendStatus(500);
    }
}