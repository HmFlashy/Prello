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
 *   /me/categories:
 *     post:
 *       tags:
 *         - Category
 *       description: Add a category to the user with the given name
 *       summary: Add a category to the user with the given name
 *       responses:
 *         201:
 *           description: The created category
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const name = req.body.name;
        if(!userId) {
            throwError(400, 'Missing userId parameter')
        } else if(!userId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The userId ${userId} is malformed`)
        }
        if(!name) {
            throwError(400, 'Missing name parameter')
        }
        const category = await UserController.addCategory(userId, name);
        res.status(201).json(category)
    } catch(error) {
        console.log(error)
        if(error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}