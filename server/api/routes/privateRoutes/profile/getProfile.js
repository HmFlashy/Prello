const UserController = require('../../../controllers/UserController');
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
 *   /profile:
 *     post:
 *       tags:
 *         - Profile
 *       description: Return the profile of the user in the token
 *       summary: Return the profile of the user in the token
 *       requestBody:
 *         description: Optional description in *Markdown*
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       responses:
 *         200:
 *           description: The profile of the user
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const user = await UserController.getById(req.user._id)
        return res.status(200).json(user)
    } catch(error) {
        logger.error(error.message);
        if(error.code){
            return res.status(error.code).json({message: error.message})
        } else {
            return res.sendStatus(500);
        }
    }
}