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
 *     put:
 *       tags:
 *         - Poll
 *       description: Updates an options name
 *       summary: Updates an options name given it's poll id and the board it belongs to
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
 *             example:
 *               name: my super name
 *       responses:
 *         200:
 *           description: The updated option
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
        const name = req.body.name;
        const boardId = req.params.boardId;
        const pollId = req.params.pollId;
        const optionId = req.params.optionId;
        const poll = await pollController.updatePollOption(boardId, pollId, optionId, name);
        //if (!poll) throwError(500);
        socketIO.broadcast("action", boardId, {
            type: "UPDATE_OPTION_POLL",
            payload: {
                _id: pollId,
                optionId,
                title: name
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