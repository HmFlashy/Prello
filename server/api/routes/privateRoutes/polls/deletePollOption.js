const pollController = require('../../../controllers/PollController');
const socketIO = require('../../../../socket/index');
const throwError = require('../../../helper/RequestHelper').throwError;
const { validationResult } = require('express-validator/check');

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /boards/:boardId/polls/:pollId/options/:optionId:
 *     delete:
 *       tags:
 *         - Poll
 *       description: Delete the given option
 *       summary: Delete the given option from a given poll in a given board
 *       responses:
 *         200:
 *           description: The deleted option
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Board'
 *         400:
 *           description: The request was malformed
 *         404:
 *           description: The given board or poll or option was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const boardId = req.params.boardId;
        const pollId = req.params.pollId;
        const optionId = req.params.optionId;
        const poll = await pollController.deletePollOption(boardId, pollId, optionId);
        //if (!poll) throwError(500);
        socketIO.broadcast("action", boardId, {
            type: "DELETE_OPTION_POLL",
            payload: {
                _id: pollId,
                optionId
            }
        });
        return res.status(200).json(poll)
    } catch (error) {
        console.log(error)
        if (error.code) {
            res.status(error.code).json(error.message);
        } else {
            res.sendStatus(500);
        }
    }
};