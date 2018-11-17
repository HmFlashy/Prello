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
 *   /boards/:boardId/polls:
 *     post:
 *       tags:
 *         - Poll
 *       description: Create a new poll
 *       summary: Create a new poll given the given name and eventually the card Id
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
 *           description: The created poll
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given board was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const name = req.body.name;
        const cardId = req.body.card;
        const boardId = req.params.boardId;
        const poll = await pollController.addPoll(boardId, name, cardId, req.user._id);
        //if (!poll) throwError(500);
        socketIO.broadcast("action", boardId, {
            type: "ADD_POLL",
            payload: { poll }
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