const boardsController = require('../../controllers/BoardsController');
const socketIO = require('../../../socket');
const throwError = require('../../helper/RequestHelper').throwError;

module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const userId = req.params.userId;
        if(!userId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }
        if(!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }

        const board = await boardsController.addBoardMemberById(boardId, userId);
        socketIO.broadcast("action", {
            type: "ADD_BOARD_MEMBER",
            payload: board.members
        });
        return res.status(200).json(board)
    } catch(error) {
        console.log(error);
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};