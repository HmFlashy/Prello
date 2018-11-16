const boardsController = require("../../../controllers/BoardsController");
const throwError = require("../../../helper/RequestHelper").throwError;

module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        if (!boardId) {
            throwError(400, "Missing boardId parameter")
        } else if (!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }
        const board = await boardsController.getBoardForExport(boardId);
        if (!board) {
            throwError(404, `The boardId ${boardId} was not found`)
        }
        return res.status(200).json(board)
    } catch (error) {
        console.log(error);
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}