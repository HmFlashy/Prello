const UserController = require('../../../controllers/UserController')
const logger = require('../../../../logger')

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
        const category = await UserController.addCategory(userId, name);
        res.status(201).json(category)
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}