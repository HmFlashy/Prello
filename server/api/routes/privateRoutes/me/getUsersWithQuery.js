const UserController = require('../../../controllers/UserController')
const throwError = require('../../../helper/RequestHelper').throwError

/**
 * @swagger
 *
 * paths:
 *   /me:
 *     get:
 *       tags:
 *         - User
 *       description: Get the 10 first me that match the given query
 *       summary: Get the 10 first me that match the given query
 *       parameters:
 *         - in: query
 *           name: query
 *           schema:
 *             type: string
 *           description: The query that the me mail or username have to match
 *       responses:
 *         200:
 *           description: The 10 first me that match the query
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const query = req.query.query;
        if(!query) {
            throwError(400, 'Missing query in the query parameters')
        }
        const users = await UserController.getUsersWithQuery(query)
        return res.status(200).json(users)

    } catch(error) {
        console.log(error)
        if(error.code) {
            res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}