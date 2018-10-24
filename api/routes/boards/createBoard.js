const boardsController = require('../../controllers/BoardsController');
const socketIO = require('../../../socket');
const throwError = require('../../helper/RequestHelper').throwError;

module.exports = async (req, res) => {
    try {
        console.log(req)
        const name = req.body.name;
        const visibility = req.body.visibility;
        const teamId = req.body.teamId;
        const userId = req.body.userId;
        if(!name) {
            throwError(400, "Missing name parameter")
        }
        if(!visibility) {
            throwError(400, "Missing visibility parameter")
        }
        if (!teamId) {
            throwError(400, "Missing teamId parameter")
        } else if(!teamId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, "teamId malformed")
        }
        if(!userId) {
            throwError(400, "Missing userId parameter")
        } else if(!userId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, "userId malformed")
        }

        const board = await boardsController.createBoard(name, visibility, teamId, userId,
            );
        socketIO.broadcast("action", {
            type: "CREATE_BOARD",
            payload: board
        });
        return res.status(201).json({
            type: "Success",
            message: "Board created",
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