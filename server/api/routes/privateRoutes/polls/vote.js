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
 *   /boards/:boardId/polls/:pollId/vote/:optionId:
 *     put:
 *       tags:
 *         - Poll
 *       description: Creates or update a vote
 *       summary: Creates or update a vote for a given user on a certain poll for a certain option
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isVoting:
 *                   type: boolean
 *                   required: true
 *             example:
 *               isVoting: true
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
 *           description: The given board or poll or option was not found
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const isVoting = req.body.isVoting;
        const boardId = req.params.boardId;
        const pollId = req.params.pollId;
        const optionId = req.params.optionId;
        const poll = await pollController.vote(boardId, pollId, optionId, isVoting, req.user._id);
        //if (!poll) throwError(500);
        socketIO.broadcast("action", boardId, {
            type: "VOTE",
            payload: {
                _id: pollId,
                optionId,
                vote: {
                    voter: {
                        _id: req.user._id,
                        fullName: req.user.fullName
                    },
                    vote: isVoting
                }
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