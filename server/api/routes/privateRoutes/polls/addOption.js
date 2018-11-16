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
 *   /boards/:boardId/polls/:pollId:
 *     post:
 *       tags:
 *         - Poll
 *       description: Add an option to an existing poll
 *       summary: Add an option to an existing poll
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 option:
 *                   type: string
 *                   required: true
 *             example:
 *               option: this poll is awesome
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
 *           description: The given poll was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const option = req.body.option;
        const boardId = req.params.boardId;
        const pollId = req.params.pollId
        const optionAdded = await pollController.addOption(boardId, pollId, option);
        //if (!poll) throwError(500);
        socketIO.broadcast("action", boardId, {
            type: "ADD_OPTION_POLL",
            payload: {
                _id: pollId,
                option: optionAdded
            }
        });
        return res.status(200).json(optionAdded)
    } catch (error) {
        console.log(error)
        if (error.code) {
            res.status(error.code).json(error.message);
        } else {
            res.sendStatus(500);
        }
    }
};