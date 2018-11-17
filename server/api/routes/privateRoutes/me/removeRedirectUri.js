const UserController = require('../../../controllers/UserController')
const logger = require('../../../../logger')

/**
 * @swagger
 * 
 * paths:
 *   /me/client_application/:clientId/uris:
 *     post:
 *       tags:
 *         - Client Application
 *       description: Add a redirect uri to a client application
 *       summary: Add a redirect uri to a client application
 *       responses:
 *         201:
 *           description: The new redirect uri
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const uri = req.params.uri;
        const clientId = req.params.clientId;
        const clientApplication = await UserController.removeRedirectUri(clientId, uri);
        res.status(201).json(clientApplication)
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}