const UserController = require('../../../controllers/UserController')
const throwError = require('../../../helper/RequestHelper').throwError

/**
 * @swagger
 * 
 * paths:
 *   /me/client_application:
 *     post:
 *       tags:
 *         - Client Application
 *       description: Add a client application to the user
 *       summary: Add a client application to the user
 *       responses:
 *         201:
 *           description: The created client application
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const name = req.body.name;
        const category = await UserController.addClientApplication(userId, name);
        res.status(201).json(category)
    } catch (error) {
        console.log(error)
        if (error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}