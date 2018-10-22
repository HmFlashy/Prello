const boardsController = require('../../controllers/BoardsController')

  /**
    * @swagger
    * definition:
    *   NewList:
    *     properties:
    *       name:
    *         type: string
    *
    * paths:
    *   /boards/{boardId}:
    *     get:
    *       tags:
    *         - Board
    *       description: Get a board by its id
    *       summary: Returns the board with the right ID
    *       parameters:
    *         - name: boardId
    *           type: string
    *           description: The id of the board to get
    *           in: path
    *           required: true
    *       responses:
    *         200:
    *           description: The board
    *           content:
    *             application/json:
    *               schema:
    *                 $ref: '#components/schemas/Board'
    *         500:
    *           description: Internal error
    */
module.exports = async (req, res) => {
    const boardId = req.params.boardId;
    try {
        const board = await boardsController.getBoardById(boardId)
        return res.status(200).json(board)
    } catch(error) {
        res.status(500).json(error.message)
    }
}