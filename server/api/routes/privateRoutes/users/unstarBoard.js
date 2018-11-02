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
 *   /users/{userId}/boardStars/{boardId}:
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
        const userId = req.params.userId;
        const boardId = req.params.boardId;
        if(!userId) {
            throwError(400, 'Missing userId parameter')
        } else if(!userId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The userId ${userId} is malformed`)
        }
        if(!boardId) {
            throwError(400, 'Missing boarId parameter')
        } else if(!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }
        const board = await UserController.unstarBoard(userId, boardId)
        res.status(200).json(board)
    } catch(error) {
        console.log(error)
        if(error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}