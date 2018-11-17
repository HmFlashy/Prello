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
 *     put:
 *       tags:
 *         - Category
 *       description: Change the name of the given category
 *       summary: Change the name of the given category
 *       responses:
 *         200:
 *           description: The updated category
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const categoryId = req.params.categoryId;
        const name = req.body.name;
        const category = await UserController.updateCategoryName(userId, categoryId, name);
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