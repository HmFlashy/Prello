const Board = require("../models/index").Board;
const Poll = require("../models/index").Poll;
const Option = require("../models/index").Option;
const Card = require("../models/index").Card;
const logger = require("../../logger")
//Return poll
const vote = async (boardId, pollId, optionId, isVoting, userId) => {
    try {
        const poll = await Poll.findById({ _id: pollId })
        poll.options.forEach(option => option._id.toString() === optionId ? isVoting.toString() === "true" ? option.voters.push(userId) : option.voters.splice(option.voters.indexOf(userId), 1) : option)
        return await Poll.findOneAndUpdate({ _id: pollId },
            { $set: { options: poll.options } }, { "new": true })
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}
//Returns added option
const addOption = async (boardId, pollId, title) => {
    try {
        const option = new Option({
            title,
            voters: []
        })
        await Poll.findOneAndUpdate({ _id: pollId },
            { $push: { options: option } }, { "new": true })
        return option
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}
//Returns poll
const updatePoll = async (boardId, pollId, card, title) => {
    try {
        await Poll.findOneAndUpdate({ _id: pollId },
            { $set: { title: title, card: card } }, { "new": true })
        let newCard
        if (card) {
            newCard = await Card.findById(card)
        }
        return await Poll.findById(pollId).populate(
            [{
                path: "card",
                select: ["_id", "name"]
            }])
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}
//Returns poll
const addPoll = async (boardId, title, card, owner) => {
    try {
        let poll = new Poll({
            title,
            owner,
            card,
            options: []
        });
        poll = await poll.save()
        await Board.findOneAndUpdate({ _id: boardId },
            { $push: { polls: poll } }, { "new": true })
        let newCard
        if (card) {
            newCard = await Card.findById(card)
        }
        return await Poll.findById(poll._id).populate(
            [{
                path: "card",
                select: ["_id", "name"]
            }])
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}
const deletePoll = async (boardId, pollId) => {
    try {
        const board = await Board.findOneAndUpdate({ _id: boardId },
            { $pull: { polls: { _id: pollId } } }, { "new": true })
        await Poll.deleteOne({ _id: pollId })
        return board
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const deletePollOption = async (boardId, pollId, optionId) => {
    try {
        return await Poll.findOneAndUpdate({ _id: pollId },
            { $pull: { options: { _id: optionId } } }, { "new": true })
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}
const updatePollOption = async (boardId, pollId, optionId, name) => {
    try {
        const poll = await Poll.findById({ _id: pollId })
        poll.options.forEach(option => option._id.toString() === optionId ? option.title = name : option)
        return await Poll.findOneAndUpdate({ _id: pollId },
            { $set: { options: poll.options } }, { "new": true })
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

module.exports = {
    vote,
    addOption,
    updatePoll,
    addPoll,
    deletePoll,
    deletePollOption,
    updatePollOption
};