const pollController = require('../../../controllers/PollController');
const socketIO = require('../../../../socket/index');
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
 *   /boards/:boardId/polls/:pollId:
 *     delete:
 *       tags:
 *         - Poll
 *       description: Deletes the poll of index :pollId
 *       summary: Deletes the poll of index :pollId
 *       responses:
 *         200:
 *           description: The deleted poll
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given poll was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        const pollId = req.params.pollId;
        const poll = await pollController.deletePoll(boardId, pollId);
        //if (!poll) throwError(500);
        socketIO.broadcast("action", boardId, {
            type: "DELETE_POLL",
            payload: {
                _id: pollId
            }
        });
        return res.status(200).json(poll)
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            res.status(error.code).json(error.message);
        } else {
            res.sendStatus(500);
        }
    }
};