const boardsController = require('../../controllers/BoardsController');
const socketIO = require('../../../socket');
const throwError = require('../../helper/RequestHelper').throwError;

module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const userEmail = req.body.email;
        if(!userEmail) {
            throwError(400, "Missing email body parameter")
        }
        if(!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, "boardId malformed")
        }

        const board = await boardsController.addBoardMemberByEmail(boardId, userEmail);
        socketIO.broadcast("action", {
            type: "ADD_BOARD_MEMBER",
            payload: board.members
        });
        return res.status(200).json({
            type: "Success",
            message: "Board updated",
            data: board
        })
    } catch(error) {
        console.log(error);
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
};