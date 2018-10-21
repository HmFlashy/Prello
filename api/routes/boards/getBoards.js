const boardsController = require('../../controllers/BoardsController')

module.exports = async (req, res) => {
    try {
        const boards = await boardsController.getBoards()
        return res.status(200).json(boards)
    } catch(error) {
        res.status(500).json(error.message)
    }
}