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
 *   /me/boards/{boardId}/category:
 *     put:
 *       tags:
 *         - Category
 *       description: Update the category of the given board
 *       summary: Update the category of the given board
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
        const categoryId = req.body.categoryId;
        if(!userId) {
            throwError(400, 'Missing userId parameter')
        } else if(!userId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The userId ${userId} is malformed`)
        }
        if(!boardId) {
            throwError(400, 'Missing boardId parameter')
        } else if(!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }
        if(categoryId) {
            if(!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
                throwError(400, `The categoryId ${categoryId} is malformed`)
            }
        }
        const user = await UserController.updateBoardCategory(userId, boardId, categoryId);
        res.status(200).json(user)
    } catch(error) {
        console.log(error)
        if(error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}