const UserController = require('../../../controllers/UserController')
const throwError = require('../../../helper/RequestHelper').throwError

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
        if(!uri) {
            throwError(400, 'Missing uri parameter')
        }
        if(!clientId) {
            throwError(400, 'Missing client parameter')
        }
        const clientApplication = await UserController.removeRedirectUri(clientId, uri);
        res.status(201).json(clientApplication)
    } catch(error) {
        console.log(error)
        if(error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}