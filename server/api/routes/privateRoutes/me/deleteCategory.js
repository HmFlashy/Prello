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
        await UserController.deleteCategory(userId, categoryId);
        res.sendStatus(200)
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}