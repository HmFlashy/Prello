const boardsController = require('../../../controllers/BoardsController');
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
 *   /boards:
 *     get:
 *       tags:
 *         - Board
 *       description: Fetches all the boards
 *       summary: Fetches all the boards
 *       responses:
 *         200:
 *           description: The corresponding boards
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const boards = await boardsController.getBoards(req.user);
        return res.status(200).json(boards)
    } catch(error) {
        logger.error(error.message)
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}