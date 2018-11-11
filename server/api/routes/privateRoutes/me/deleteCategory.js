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
 *   /me/categories/{categoryId}:
 *     post:
 *       tags:
 *         - Category
 *       description: Delete the category of the user with the given id
 *       summary: Delete the category of the user with the given id
 *       responses:
 *         200:
 *           description: The deleted category
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const categoryId = req.params.categoryId;
        if(!userId) {
            throwError(400, 'Missing userId parameter')
        } else if(!userId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The userId ${userId} is malformed`)
        }
        if(!categoryId) {
            throwError(400, 'Missing categoryId parameter')
        } else if(!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The categoryId ${categoryId} is malformed`)
        }
        await UserController.deleteCategory(userId, categoryId);
        res.sendStatus(200)
    } catch(error) {
        console.log(error)
        if(error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}