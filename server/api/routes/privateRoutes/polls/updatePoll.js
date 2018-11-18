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
 *     put:
 *       tags:
 *         - Poll
 *       description: Update the name or card of a poll
 *       summary: Update the name or card of a poll
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   required: true
 *                 card:
 *                   type: ObjectId
 *                   required: true
 *             example:
 *               name: my super name
 *               card: 5bce3aaf84c77d0a433029a9
 *       responses:
 *         200:
 *           description: The updated poll
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given board or poll was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const name = req.body.name;
        const card = req.body.card;
        const boardId = req.params.boardId;
        const pollId = req.params.pollId;
        const poll = await pollController.updatePoll(boardId, pollId, card, name);
        socketIO.broadcast("action", boardId, {
            type: "UPDATE_POLL",
            payload: {
                _id: pollId,
                title: name,
                card: poll.card
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