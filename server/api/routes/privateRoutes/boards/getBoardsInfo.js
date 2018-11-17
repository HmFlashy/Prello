const boardsController = require('../../../controllers/BoardsController');
const throwError = require("../../../helper/RequestHelper").throwError;
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
 *       description: Fetches the infos of all the boards
 *       summary: Fetches the infos of all the  boards
 *       responses:
 *         200:
 *           description: The boards infos
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const boards = await boardsController.getBoardsInfo(boardId);
        return res.status(200).json(boards)
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}