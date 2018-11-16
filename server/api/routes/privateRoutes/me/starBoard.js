const UserController = require('../../../controllers/UserController')
const throwError = require('../../../helper/RequestHelper').throwError

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /me/boardStars/{boardId}:
 *     delete:
 *       tags:
 *         - User
 *       description: Unstar the given board for the given user
 *       summary: Unstar the given board for the given user
 *       responses:
 *         200:
 *           description: The updated user
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const boardId = req.params.boardId;
        const board = await UserController.starBoard(userId, boardId)
        res.status(200).json(board)

    } catch (error) {
        console.log(error)
        if (error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}