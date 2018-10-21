const boardsController = require('../../controllers/BoardsController')

module.exports = async (req, res) => {
    const boardId = req.params.boardId;
    try {
        const board = await boardsController.getBoardById(boardId)
        return res.status(200).json(board)
    } catch(error) {
        res.status(500).json(error.message)
    }
}