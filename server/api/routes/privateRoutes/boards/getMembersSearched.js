const UserController = require('../../../controllers/UserController');
const logger =require('../../../../logger')

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /boards/{boardId}/members/{value}:
 *     get:
 *       tags:
 *         - Board
 *       description: Fetches all the members containing the value inside either their fullName or username and not already in the board
 *       summary: Fetches all the members matching the search value
 *       responses:
 *         200:
 *           description: The corresponding members
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Member'
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const query = req.params.query;
        const members = await UserController.getMembersBySearch(boardId, query);
        return res.status(200).json(members)
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}