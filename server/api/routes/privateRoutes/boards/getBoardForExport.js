const boardsController = require("../../../controllers/BoardsController");
const throwError = require("../../../helper/RequestHelper").throwError;
const logger =require('../../../../logger')

module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const board = await boardsController.getBoardForExport(boardId);
        if (!board) {
            throwError(404, `The boardId ${boardId} was not found`)
        }
        return res.status(200).json(board)
    } catch (error) {
        logger.error(error.message);
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}